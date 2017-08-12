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
            user: 'chubarova.webpage@gmail.com', // Your email id
            pass: '55801989' // Your password
        }
    });

    let mailOptions = {
        from: ``, // sender address
        to: 'esher5580@gmail.com', // list of receivers
        subject: `${req.body.name} отправил Вам сообщение через контактную форму!`,
        //text: req.body.message,
        html: `<span>${req.body.message}</span><br/><br/><i>написать ответ </i><b>${req.body.email}</b>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({
                type: 'error',
                message: 'Произошла ошибка, сообщение не отправлено!',
                info: error
            });
        } else {
            console.log('Message sent: ' + info.response);
            res.json({
                type: 'success',
                message: 'Сообщение успешно отправлено!',
                info: info.response
            });
        }
    });
});

module.exports = router;