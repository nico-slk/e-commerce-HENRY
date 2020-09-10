const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
// // ----> passport --->
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const {User} = require('./db.js');

//---- Autenticar con Google
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// ---> passport ---->
// Configuración de estrategia local de Passport.

// Para configurar la estrategia local de Passport es necesario crear una nueva instancia
// de Strategy pasándole como parámetro una función ("Verify Callback") que reciba las credenciales del usuario
// (Usuario y contraseña) y una función que suele definirse como "done" que debe ser invocada
// de distintas formas según si las credenciales son válidas o no:
//  - Si las credenciales son validas --> done(null, user) (Donde user es el objeto conteniendo los datos del usuario)
//  - Si las credenciales son invalidas --> done(null, false)
//  - Si hubo un error durante la ejecución de esta función --> done(err)

passport.use(new Strategy({
    usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({where: { email: email }})
        .then((user) => {
            if (!user) return done(null, false)
            user.isPasswordValid(password)
            .then(validation => {
              if(user && validation) return done(null, user)
              else return done(null, false)
            })     
        })
        .catch(err => {
            return done(err);
        })
    }
));


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: "1069016896277-o3gjr0810k4ejdlf8k99tpnb0q3sf6s4.apps.googleusercontent.com",
  clientSecret:"GS-WyU5dqD2E_agKOagAmXJV",
  callbackURL: "http://localhost:3001/auth/google/callback",
  //passReqToCallback: true
},
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ where: {googleId: profile.id}, defaults: {
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0].value,
      password: profile.id,
      admin: false
      } })
      .then(([user, created])=> {
         return done(null, user)})
     })
)


// Configuración de la persistencia de la sesión autenticada

// Para recuperar los datos de la sesión autenticada Passport necesita dos métodos para
// serializar y deserializar al usuario de la sesión. Para ello la forma más práctica de hacerlo
// es serializando el ID del usuario para luego al deserealizar a partir de dicho ID obtener
// los demás datos de ese usuario. Esto permite que la información almacenada en la sesión sea
// lo más simple y pequeña posible

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Al deserealizar la información del usuario va a quedar almacenada en req.user

passport.deserializeUser(function(id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(err => {
      return done(err);
    })
});



// <--- passport <---

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
// ---> passport --->
server.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});
// <--- passport <---

/*server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});*/

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
