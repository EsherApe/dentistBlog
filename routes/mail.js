require('dotenv').config();

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
// create application/json parser
let jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res, next) => {
    let api_key = MAILGUN_API_KEY;
    let domain = DOMAIN_NAME;
    let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    let data = {
      from: `${req.body.name} ${req.body.email}`,
      to: EMAIL_NAME,
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