//Module dependencies.
var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, table = require('./routes/table')
	, http = require('http')
	, path = require('path');
//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var colorUtility = require('./public/javascripts/color');

//connect to admin db
/* var adminConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Tinkwyatt811',
	database: 'test'
});

adminConnection.connect(); */

//connect to user (table) db
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Tinkwyatt811',
	database: 'moodsetter',
});

connection.connect();

//global connection
global.db = connection;
// global.db = tableConnection;

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
	//cookie expires after 2 min
	cookie: { maxAge: 880000 }
}))

// development only

app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/presetcolor', user.presetcolor);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile', user.profile);//to render users profile

app.post('/table', table.tableSet);//call for login post

/* app.get('/user', function (req, res) {
	console.log(req.query);
	ssn = req.session;
	ssn.tableID = req.query.tableID;
	console.log("req.query.tableID", req.query.tableID);
	console.log(ssn.tableID);
	res.end('done');
}); */

//get the color the user picked from the pages
/* app.post('/table', function (req, res) {
	//var redPreset = req.body.redPreset;
	//console.log(redPreset);
	console.log("this TABLE is before sending the color");

	var red = req.body.redInput;
	var green = req.body.greenInput;
	var blue = req.body.blueInput;
	var tablePin = req.session.tablePin;
	//var tableID = req.session.tableID;
	console.log("sending color");

	table.tableSet();

	//value from the color pages just submitted
	console.log("body", req.body);
	//res.send(200);
	console.log("sent color");

	//redirect to color page
	return res.redirect('back');

}); */

//get the color the user picked from the pages
app.post('/table', function (req, res) {
	//var redPreset = req.body.redPreset;
	//console.log(redPreset);
	console.log("this is before sending the color");

	var red = req.body.redInput;
	var green = req.body.greenInput;
	var blue = req.body.blueInput;
	var host = req.session.host;
	//var tableID = req.session.tableID;
	console.log("sending color");

	colorUtility.sendColor(host, red, green, blue);

	//value from the color pages just submitted
	console.log("body", req.body);
	//res.send(200);
	console.log("sent color");

	//redirect to color page
	return res.redirect('back');

});




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

app.listen(8080)
module.exports = app;






