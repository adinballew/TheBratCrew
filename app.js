"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = require('express-hbs');  // https://github.com/barc/express-hbs
var intl = require('handlebars-intl');  // https://formatjs.io/handlebars/
var session = require('express-session');  // https://github.com/expressjs/session

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('view engine', 'hbs');

app.engine('hbs', hbs.express4({
	defaultLayout: __dirname + '/views/layouts/default.hbs',
	partialsDir: __dirname + '/views/partials',
	layoutsDir: __dirname + '/views/layouts'
}));

intl.registerWith(hbs);

app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// res.locals is an object passed to hbs engine
app.use(function (req, res, next)
{
	res.locals.session = req.session;
	next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next)
{
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
