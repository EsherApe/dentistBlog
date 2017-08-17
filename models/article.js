const log = require('../libs/log');
const moment = require('moment');
const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: 'Чубарова Н.Г.'
  },
  category: {
    type: String
  },
  tags: {
    type: [String],
  },
  imgUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', schema);