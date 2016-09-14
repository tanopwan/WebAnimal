
import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
//import favicon from 'serve-favicon';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App.jsx';

import bodyParser from 'body-parser';
import passport from './controllers/common/auth.js'
import fbPassport from './controllers/user/fbPassport.js'

import router from './router.jsx';
import user_router from './controllers/user/users.js'
import case_router from './controllers/cases.js'
import upload_router from './controllers/uploads.js'

var FACEBOOK_APP_ID = '1669516483298849';
var FACEBOOK_APP_SECRET = '2c979757d7bba3051bbdaa81f0b3073d';

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(fbPassport.create(FACEBOOK_APP_ID, FACEBOOK_APP_SECRET).initialize());

app.use('/api/user', user_router);
app.use('/api/case', case_router);
app.use('/api/upload', upload_router);
app.use('/', router);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../templates'));

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});
