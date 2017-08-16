const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nconf = require('./config');
const log = require('./libs/log');
const app = express();

app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));

if (app.get('env') == 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// static
app.use('/static', express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const article = require('./routes/article');
const mail = require('./routes/mail');

app.use('/', index);
app.use('/article', article);
app.use('/send', mail);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error-page');
});

module.exports = app;