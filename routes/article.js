const mongoose = require('../libs/mongoose');
const Article = require('../models/article');
const express = require('express');
const moment = require('moment');
moment.locale('ru');
const router = express.Router();

router.get('/:id', (req, res) => {
    
    let query = Article.find({}, (err) => {
        mongoose.disconnect();
        if (err) return console.log(err);
    });

    query.then(article => {
        let createdAt = moment(article.createdAt).format("LLLL");

        res.render('article-page', {
            id: article._id,
            imgUrl: article.imgUrl,
            articleTitle: article.title,
            date: createdAt,
            author: article.author,
            category: article.category,
            tags: article.tags,
            body: article.content
        });    
    })

});

module.exports = router;
