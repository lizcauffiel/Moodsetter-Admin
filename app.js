//This is place where we will be defining all our website routes.

//Module dependencies.
var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, table = require('./routes/table')
	, http = require('http')
	, path = require('path');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");



//IDK IF NEEDED
var colorUtility = require('./public/javascripts/color');





//connect to user sql (table) db
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Tinkwyatt811',
	database: 'moodsetter',
});

//create connection
connection.connect();

//global connection
global.db = connection;

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	//cookie expires after 1 hour
	cookie: { expiry: 3600 }
}))

// development only
app.get('/', routes.index);//call for main index page
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/presetcolor', user.presetcolor);//call for dashboard page after login

app.post('/table', table.tableSet);//call for table.js post

//get the color the user picked from the pages
app.post('/table', function (req, res) {
	//testing
	//console.log("this is before sending the color");

	//the input and values from the color forms (pages)
	var red = req.body.redInput;
	var green = req.body.greenInput;
	var blue = req.body.blueInput;
	var host = req.session.host;

	//testing
	//console.log("sending color");





	//IDK IF NEEDED
	//call sendColor function in the colorUtility pass the parameters
	//of the values found in the color forms (pages)
	colorUtility.sendColor(host, red, green, blue);





	//value from the color pages just submitted
	console.log("body", req.body);
	//testing
	//res.send(200);
	//console.log("sent color");

	//redirect to color page they just submitted
	return res.redirect('back');

});



//get the pages when the user clicks on their links and render them
app.get('/loginhome', function (req, res) {
	res.render('loginhome', {
		title: 'loginhome'
	});
});
app.get('/mycolors', function (req, res) {
	res.render('mycolors', {
		title: 'mycolors'
	});
});
app.get('/moodcolor', function (req, res) {
	res.render('moodcolor', {
		title: 'moodcolor'
	});
});
app.get('/faq', function (req, res) {
	res.render('faq', {
		title: 'faq'
	});
});
app.get('/about', function (req, res) {
	res.render('about', {
		title: 'about'
	});
});
app.get('/contact', function (req, res) {
	res.render('contact', {
		title: 'contact'
	});
});
//Middleware

//listening on port 8080
app.listen(8080)
//export app from this file
module.exports = app;






