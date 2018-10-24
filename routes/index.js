var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
	res.setHeader('index', { title: 'Moodsetter' });
	res.use(express.static('css'));
	res.end();
});

module.exports = router;
