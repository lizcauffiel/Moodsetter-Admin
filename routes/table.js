var express = require('express');
var router = express.Router();
//new
const request = require('request');
//new
var session = require('express-session');
var app = express();

var ssn;
//end of new

// /* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

// module.exports = router;


//-----------------------------------------------table ID call------------------------------------------------------
exports.tableSet = function (req, res) {
	var message = '';
	var sess = req.session;
	console.log("hi");
	//if (req.method == "POST") {
	var post = req.body;
	var tablePin = post.tablePin;

	var red = req.body.redInput;
	var green = req.body.greenInput;
	var blue = req.body.blueInput;
	console.log(red, blue, green);

	// var name = post.user_name;
	// var pass = post.password;
	console.log("post", post);
	console.log("tablePin", tablePin);
	//	var sql = "SELECT tableID, host FROM `customertable` WHERE`tablePin` = '12345'";
	var sql = "SELECT tableID, host FROM `customertable` WHERE `tablePin`='" + tablePin + "'";
	db.query(sql, function (err, results) {
		if (results.length) {

			req.session.tableID = results[0].tableID;
			req.session.host = results[0].host;
			req.session.tablePin = tablePin

			var currentUserID = results[0].tableID;
			var host = results[0].host;
			var currentUsertablePin = tablePin;

			//	console.log("results id", currentUserID);
			console.log('results host', host);
			//	console.log('results tablePin', currentUsertablePin);


			var colorEndPoint = "http://" + host + "/changeLedInRange?from=0&to=59&red=" + red + "&green=" + green + "&blue=" + blue + "&brightness=90"
			console.log("contacting colorEndPoint", colorEndPoint);

			request(colorEndPoint, { json: true }, (err, res, body) => {
				console.log("just sent request");
				if (err) { return console.log(err); }
				//	console.log(body.url);
				console.log("this is color js");
				//	console.log(body.explanation);

			});



			res.redirect('/presetcolor');

			/* 	}
				else {
					message = 'Wrong Credentials.';
					res.render('index.ejs', { message: message });
					console.log('WRONG CREDENTIALS');
				}
	
			});
		} else {
			res.render('index.ejs', { message: message });
		} */

		};
	})
};
