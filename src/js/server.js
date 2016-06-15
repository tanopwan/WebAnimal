
import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
//import favicon from 'serve-favicon';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App.jsx';

import bodyParser from 'body-parser';
import passport from './controllers/auth.js'

import router from './router.jsx';
import user_router from './controllers/users.js'
import case_router from './controllers/cases.js'
import donor_router from './controllers/donors.js'

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/api/user', user_router);
app.use('/api/case', case_router);
app.use('/api/donor', donor_router);
app.use('/', router);
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../templates'));

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});

