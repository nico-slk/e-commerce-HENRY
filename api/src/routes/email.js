const server = require("express").Router();
const nodemailer = require("nodemailer")
const { User } = require("../db.js");
var crypto = require('crypto');


//---------- Email: confirmacion -------
server.post("/creada", (req, res) => {
    console.log("Email ENVIADO")
    const email = req.body.email
    const cart = req.body.cart
    console.log('abajo tiene q aparecer cart')
    let message = (
        '<table style="border: 1px solid #333;">' +
        '<thead>' +
        '<th style="border: 1px solid #333;"> Producto </th>' +
        '<th style="border: 1px solid #333;"> Precio </th>'  +
        '<th style="border: 1px solid #333;"> Cantidad </th>' +
        '<th style="border: 1px solid #333;"> Subtotal </th>' +
        '</thead>'
      ); 
    
        for(elem of cart){
        message += (
            '<tr>' +
            '<th style="border: 1px solid #333;">' + elem.product.name + '</th>' +
            '<th style="border: 1px solid #333;">' + elem.product.price + '</th>'  +
            '<th style="border: 1px solid #333;">' + elem.quantity + '</th>' +
            '<th style="border: 1px solid #333;">' + elem.quantity * elem.product.price + '</th>' +
            '</tr>'
        );
        }
        message +=  '</table>';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'darkmarket666@gmail.com',
            pass: 'grandePela'
        }
    });

    var mailOptions = {
        from: "Dark Market",
        to: email,
        subject: "Hola! su compra ha sido confirmada.",
        html: "Te avisaremos cuando tu compra este siendo despachada. Podés seguir el estado de la orden en tu perfil de darkmarket.com" + message

    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message)
        } else {
            console.log("email enviado");
            res.status(200).jsonp(req.body)
        }
    })
})


//---------- Email: despachado -------
server.post("/procesando", (req, res) => {
    console.log('mail enviado')
    const { email } = req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'darkmarket666@gmail.com',
            pass: 'grandePela'
        }
    });

    var mailOptions = {
        from: "Dark Market",
        to: email,
        subject: "Hola! Su compra ya esta en proceso.",
        text: "Le estara llegando en los próximos días"
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message)
        } else {
            console.log("email enviado");
            res.status(200).jsonp(req.body)
        }
    })
})


// //---------- Email: forgot -------
// server.post('/forgot', function(req, res, next) {


//             crypto.randomBytes(20, function(err, buf) {
//                 token = buf.toString('hex');
//                 return token
//                 // done(err, token);
//             })
// console.log('BODY', req.body)
//                 User.findOne({ where: {email: req.body.email}})  
//                 .then(usuario => {
//                     usuario.update({resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 })
    
//                     const transporter = nodemailer.createTransport({
//                         service: 'gmail',
//                         auth: {
//                             user: 'darkmarket666@gmail.com',
//                             pass: 'grandePela'
//                         }
//                     });
        
//                     var mailOptions = {
//                         from: "Dark Market",
//                         to: usuario.email,
//                         subject: 'Node.js Password Reset',
//                         text: 'http://localhost:3000/ResetPassword/' + token
//                     };
        
//                     transporter.sendMail(mailOptions, (error, info) => {
//                         if (error) {
//                             res.status(500).send(error.message)
//                         } else {
//                             console.log("reset enviado");
//                             res.status(200).jsonp(req.body)
//                         }
//                     })
//             })
//             .catch(err => console.log(err))
            
//                 // user.save(function(err) {
//                 //     done(err, token, user);
//                 // });

            

// });


module.exports = server;