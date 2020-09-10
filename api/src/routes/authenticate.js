const server = require("express").Router();
const { User } = require("../db.js");
const passport = require('passport');





server.get('/', function(req, res) {
    res.render('home', { user: req.user });
});

server.get('/login', function(req, res){
    res.render('login');
});


server.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        console.log('inicio de sesion exitoso')
        res.json(req.user)
    // res.redirect('/');
});

server.get('/logout', function(req, res){
    req.logout();
    res.json({})
    console.log('cierre de sesion')
});

function isAuthenticated(req, res, next) {
    console.info('isAuthenticated')
    if(req.isAuthenticated()) {
        console.info('esta authenticado')
        next();
    } else {
        console.info('no esta authenticado')
        res.json(false);
        //res.redirect(403, '/Login')
    }
}

server.get('/profile', isAuthenticated, function(req, res){
    console.info('en profile autenticado')
    res.json(true)
});




//------Para autenticar con cuenta de GoogleStrategy


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
server.get('/google',
  passport.authenticate('google', { scope: ['profile' , 'email'] }),
  function(req, res) {
      console.log('inicio de sesion exitoso')
      res.json(req.user)
  // res.redirect('/'););
  })


// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
server.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('//localhost:3000'); 
  });

//

const isLoggedId = (req, res, next) => {
    if(req.user){
        next();
    }else{
        res.sendStatus(403);
    }
}

server.get("/google/redirect",passport.authenticate('google'));

server.get("/filed", (req, res) => res.sen("Fallo al loguearte"))
server.get("/good", isLoggedId, (req, res) => res.sen("Bienvenido a Mercado Negro"))


module.exports = server;
module.exports.isAuthenticated = isAuthenticated;

/*function isAdmin(req, res, next) {
    if(req.user.admin === true) {
        next();
    } else {
        res.json(false);
    }
}

server.get('/Admin', isAuthenticated, isAdmin, function(req, res){
    res.json(true)
});*/
