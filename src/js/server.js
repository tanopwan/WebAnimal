
import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import favicon from 'serve-favicon';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App.jsx';

import bodyParser from 'body-parser';
import mongodb from 'mongodb';

import router from './router.jsx';
import user_router from './controllers/users.js'
 
var app = express();

app.use(express.static('public'));
app.use('/api', user_router);
app.use('/', router);
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../templates'));
 
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});

var url = 'mongodb://localhost:27017/webanimal';
var db;
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function(err, database) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		console.log('Connection established to ', url);
		db = database;
	}
})