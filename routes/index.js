const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('main-page', {
        mainTitle: 'Чубарова Наталья',
        articleId: 10
    });
});

module.exports = router;