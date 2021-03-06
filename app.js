"use strict";
var express = require('express');
var oauth = require('./lib/oAuth/oauth');
var port = process.env.PORT || 3000;
var redis = require('redis');
var client = redis.createClient();

var app = express();

// Require Routes js
var routesHome = require('./routes/home');

// Serve static files
app.use(express.static(__dirname + '/public'));

app.use('/home', routesHome);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	console.log('RedirectToHome call');
	
	oauth.redirectToHome(req, res, app);
	//oauth.redirectAuthURI(res);
});

app.get('/oauthcallback', function(req, res) {
	console.log('oauthcallback call');
	oauth.authenticate(req, res, app);
});

app.get('/renewUserAccess', function(req, res) {
	console.log('renewUserAccess call');
	oauth.redirectAuthURI(res);
});

// Served Localhost
console.log('Served: http://localhost:' + port);
app.listen(port);