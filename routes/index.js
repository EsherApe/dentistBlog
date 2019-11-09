const mongoose = require('../libs/mongoose');
const Article = require('../models/article');
const moment = require('moment');
const express = require('express');
const log = require('../libs/log')(module);
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    let query = Article.find({}, (err) => {
        mongoose.disconnect();
        if (err) return log.error(err);
    });

    query.then((articles) => {
        let getFormatedDates = () => {
            let articlesDates = [];
            articles.forEach(function(article) {
                let publishDate = moment(article.createdAt, 'YYYY/MM/DD');
                articlesDates.push({
                    day: publishDate.format('D'),
                    month: publishDate.format('MMMM'),
                    year: publishDate.format('YYYY')
                })
            }, this);

            return articlesDates;
        }

        res.render('main-page', {
            mainTitle: 'Natalya Chubarova',
            articles: articles,
            publishDates: getFormatedDates()
        });
    })
});

module.exports = router;