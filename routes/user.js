//module dependencies
var express = require('express');
var router = express.Router();

// /* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});


//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
	//setting variables
	var message = '';
	//session variable
	var sess = req.session;

	//if the request method is post
	if (req.method == "POST") {
		//variable equals what was posted in the body
		var post = req.body;
		//variable equals the username the user enter on the login page
		var name = post.user_name;
		//variable equals the password the user enter on the login page
		var pass = post.password;

		//variable equals a sql select statement saying
		//select the id, first_name, last_name, user_name from the admin table in the database where the user_name and password equals 
		//what the user typed in
		var sql = "SELECT id, first_name, last_name, user_name FROM `admin` WHERE `user_name`='" + name + "' and password = '" + pass + "'";
		//calling the database and passing parameters
		db.query(sql, function (err, results) {
			//if the results are not null or undefined (there is something in the database that meet the credentials the user put in)
			if (results.length) {
				//set the session variable equal to the id found
				req.session.userId = results[0].id;
				//set the session variable equal to the user found
				req.session.user = results[0];

				//testing
				//console.log(results[0].id);

				//redirect the user to the preset color section page
				res.redirect('/presetcolor');
			}
			//if the credentials are wrong give the user an error message saying "Wrong Credentials." and direct them back to the index
			//page (login page)
			else {
				message = 'Wrong Credentials.';
				res.render('index.ejs', { message: message });
			}

		});
	}
	//if the credentials are wrong give the user an error message saying "Wrong Credentials." and direct them back to the index
	//page (login page)
	else {
		res.render('index.ejs', { message: message });
	}

};
//-----------------------------------------------dashboard page functionality----------------------------------------------
//this is the page the user is directed to after logging in, if they were successful
exports.presetcolor = function (req, res, next) {
	//setting session variables to the user and userID
	var user = req.session.user,
		userId = req.session.userId;

	//testing
	//	console.log('ddd=' + userId);

	//if the userID is empty (not properly logged in) send the user to the homepage (login page)
	if (userId == null) {
		res.redirect("/login");
		return;
	}

	//variable equal sql statement saying select all the variable in the database from the admin table 
	//where the id equals the founded userID from logging in 
	var sql = "SELECT * FROM `admin` WHERE `id`='" + userId + "'";

	//calling database and passing parameters, if successful render the preset color selection page
	db.query(sql, function (err, results) {
		res.render('presetcolor.ejs', { user: user });
	});
};
