var express = require('express');
var app = express();
var path = require('path')
var mongoose = require('mongoose');

// var flash = require('connect-flash');
// var morgan = require('morgan');
// var cookieParser = require('cookie-parser');

if (process.env.NODE_ENV !== 'production') { 
  var config = require('./config/config');
}

var dbConnectionString = process.env.DB_CONNECTION_STRING || config.dbConnectionString();

var port = process.env.PORT || 8080;

// Serving Static Files
app.use(express.static(path.join(__dirname, '../client')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/materialize', express.static(path.join(__dirname, '../node_modules/materialize-css/')));
app.use('/materialize-clock', express.static(path.join(__dirname, '../node_modules/materialize-clockpicker')));

// setting the path for views and the view engine
app.set('views', path.join(__dirname + '/../client/views'))
app.set('view engine', 'ejs');

// Configuring Passport
// allows user session to be persistent in nature
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mystery'}));
app.use(passport.initialize());
app.use(passport.session());


// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());


// Initialize Passport
var initPassport = require('./passport/passport_init.js');
initPassport(passport);

// rendering the index page
app.get('/', function(req, res) {
  res.render('pages/index')
});


// rendering the signup page
app.get('/signup', function(req, res) {
  res.render('pages/signup');
});

// rendering the login page
app.get('/login', function(req, res) {
  res.render('pages/login');
});

app.get('/home/profile/:id', function(req, res) {
  console.log('UUUUSSSEERRRR', req.user); 
  res.render('pages/profile', {user: req.user});
});


app.get('/home/create_appearance', function(req, res) {
	console.log('getting create appearance page')
  res.render('pages/create_appearance', {user: req.user});
});

app.get('/home/search_appearances', function(req, res) {
	console.log('getting search appearances page')
  console.log('==================================')
  console.log('req.user', req.user)
	res.render('pages/search_appearances', {user: req.user});
});

app.get('/home/messages', function(req, res) {
  res.render('pages/messages', {user: req.user});
});


mongoose.connect(dbConnectionString);


// routes
var userRoutes = require('./routes/userRoutes.js');
userRoutes(app, passport);

var appearanceRoutes = require('./routes/appearanceRoutes.js');
appearanceRoutes(app);

app.listen(port, function(){
  console.log('server is listening on port ' + port);
});