require('dotenv').config();

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
// create application/json parser
let jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res, next) => {
    let api_key = 'key-8d0c9854286f5eb588bf523c6f58af21';
    let domain = 'chubarova.com.ua';
    let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    let data = {
      from: `${req.body.name} ${req.body.email}`,
      to: 'esher5580@gmail.com',
      subject: 'Запрос с персональной странички!',
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
            console.log(info);
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