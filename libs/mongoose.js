const mongoose = require('mongoose');
const config = require('../config');
const log = require('../libs/log')(module);

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

const db = mongoose.connection;
db.on('error', err => {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

module.exports = mongoose;