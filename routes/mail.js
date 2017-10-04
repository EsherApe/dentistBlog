require('dotenv').config();

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// create application/json parser
let jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res, next) => {
    let api_key = process.env.MAILGUN_API_KEY;
    let domain = process.env.MAILGUN_API_DOMAIN;
    let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    let data = {
      from: `${req.body.name} ${req.body.email}`,
      to: process.env.MAILGUN_API_TO,
      subject: 'Запись на прием!',
      text: req.body.message
    };
     
    mailgun.messages().send(data, function (error, info) {
        if (error) {
            console.log(error);
            res.json({
                type: 'error',
                message: 'Произошла ошибка, сообщение не отправлено!',
                info: error
            });
        } else {
            res.json({
                type: 'success',
                message: 'Сообщение успешно отправлено!',
                info: info.response
            });
        }
    });
});

module.exports = router;