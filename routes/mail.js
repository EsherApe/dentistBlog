require('dotenv').config();

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
// create application/json parser
let jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res, next) => {
    let nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'esher5580@gmail.com', // Your email id
            pass: '55801989esher' // Your password
        }
    });

    let mailOptions = {
        from: req.body.email, // sender address
        to: 'esher5580@gmail.com', // list of receivers
        subject: `${req.body.name} отправил Вам сообщение через контактную форму!`, // Subject line
        text: req.body.message //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({
                type: 'success',
                message: 'Сообщение успешно отправлено!',
                yo: info.response
            });
        }
    });
});

module.exports = router;