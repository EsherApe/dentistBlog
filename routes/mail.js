require('dotenv').config();

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
// create application/json parser
let jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res, next) => {
    const helper = require('sendgrid').mail;
    const fromEmail = new helper.Email(req.body.email);
    const toEmail = new helper.Email('esher5580@gmail.com');
    const subject = `Письмо с персональной странички от ${req.body.name}`;
    const content = new helper.Content('text/plain', req.body.message);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);
    const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
        }
        response.body = 'message is delivered!';
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });
});

module.exports = router;