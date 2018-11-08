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






