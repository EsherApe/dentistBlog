let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('main-page', {title: 'main-page'});
});

module.exports = router;
