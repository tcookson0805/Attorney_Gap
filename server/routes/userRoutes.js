var userController = require('../controllers/userController');
var bodyParser = require('body-parser');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}


module.exports = function(app, passport) {
  
  app.use(bodyParser.json());
  
  app.use(bodyParser.urlencoded({ extended: true}));
  
  // route for getting all users
  // app.get('/api/users', userController.getAllUsers);
  
  // route for login of user
  app.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  
  // // route for finding a user
  // app.get('/api/users/:username', userController.getUser);
  
  // route for creating a user
  app.post('/api/users', passport.authenticate('signup', {
    successRedirect:'/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  
  // route for
  // app.post('/api/users/:id', userController.updateUser);

  app.route('/api/users/:id')
      .post(userController.updateUser)
      .get(function(req, res){
        res.redirect('/home')
      });


  // route for deleting a user
  app.delete('/api/users', userController.deleteUser);
  
}