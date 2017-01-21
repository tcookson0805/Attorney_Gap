var UserModel = require('../models/userModel');

module.exports = {
  
  // Creation
  
  createUser : function(req, res, next) {
    
    
    var newUser = UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      firmName: req.body.firmName,
      phone: req.body.phone,
      fax: req.body.fax,
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      }
    });
    
    newUser.password = newUser.generateHash(req.body.password);
    
    
    newUser.save(function(err) {
      if(err) {
        throw err;
      }
      res.send('Success');
    });
  
  },
  
  // Read
  
  getAllUsers : function(req, res, next) {
    UserModel.find({}, function(err, users){
      if(err) {
        throw err;
      }
      res.send(users);
    })
  },
  
  getUser : function(req, res, next) {
    
    UserModel.find({ username: req.params.id }, function(err, user) {
      if(err){
        throw err;
      }
      res.send('user');
    });

  },
  
  // Update
  
  updateUser : function(req, res, next) {
    
    var set = {
      $set: req.body
    }
    
    UserModel.findOneAndUpdate({_id: req.params.id}, set, {upsert:true}, function(err, user){
      if(err){
        throw err;
      }
      console.log('profile successfully updated');
      res.redirect('/home');
    });
    
    
  },
  
  // Delete
  
  deleteUser : function(req, res, next) {
    
    UserModel.findOneAndRemove({ username: req.body.id }, function(err, user) {
      if(err) {
        throw err;
      }
      res.send('Deleted ' + user);
      
    });
    
  }
  
  
}