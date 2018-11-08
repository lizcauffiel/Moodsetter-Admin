// This file will get the form information of the colors RGB values and table number that was posted on the color pages
// then it will connect to the database using the table number information and grab the hist value collelating to the table number. 
// The host in the database is the ip address and port of the Raspberry Pi. Once the host is selected from the database a request 
// "colorEndPoint" is sent to the Raspberry Pi. The request is the url that says the host to contact and RGB values to change to, so 
// the LED lights will change color.

var express = require('express');
var router = express.Router();
const request = require('request');
var session = require('express-session');
var app = express();
var ssn;

// /* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

//tableSet function parameters are req and res 
// req is an object containing information about the HTTP request that raised the event. 
// In response to req, you use res to send back the desired HTTP response.
exports.tableSet = function (req, res) {
	var message = '';

	//assigning variables
	var sess = req.session;
	var post = req.body;
	var tablePin = post.tablePin;
	var red = req.body.redInput;
	var green = req.body.greenInput;
	var blue = req.body.blueInput;

	//testing purposes
	console.log(red, blue, green);
	console.log("post", post);
	console.log("tablePin", tablePin);

	//select the tableID and host from the customertable table in the database where the tablePin
	//is the same table pin the user entered on the color page
	var sql = "SELECT tableID, host FROM `customertable` WHERE `tablePin`='" + tablePin + "'";
	//query is the request for information from the customertable database table. 
	db.query(sql, function (err, results) {
		if (results.length) {

			//from the result get the value and store it in the session as that variable name
			req.session.tableID = results[0].tableID;
			req.session.host = results[0].host;
			req.session.tablePin = tablePin

			//from the result get the value and store it in that variable name
			var currentUserID = results[0].tableID;
			var host = results[0].host;
			var currentUsertablePin = tablePin;

			//testing purposes
			console.log('results host', host);

			//variable for the http url where the host is the value in the variable (ip address and port)
			//red, green and blue values are the color values selected from the color pages
			var colorEndPoint = "http://" + host + "/changeLedInRange?from=0&to=59&red=" + red + "&green=" + green + "&blue=" + blue + "&brightness=50"
			//testing purposes
			console.log("contacting colorEndPoint", colorEndPoint);

			//send the request colorEndPoint, if it doesn't work send error
			request(colorEndPoint, { json: true }, (err, res, body) => {
				if (err) { return console.log(err); }
			});

			//after the request is sent redirect the user back on the same page they were on
			return res.redirect('back');

		};
	})
};
