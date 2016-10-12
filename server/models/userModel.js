var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  
  firstName: {
    type: String,
    required: true
  },
  
  lastName: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true
  },
  
  firmName: {
    type: String
  },
  
  statesLicensed: [{
    state: {
      type: String
    },
    barNumber: {
      type: Number,
      default: 54321,
      required: true
    }
  }],
  
  countiesAvailable: [{
    state: String,
    counties:[{
      type: String,
      required: true
    }]
  }],
  
  phone: {
    type: Number,
    minlength: 10,
    default: 0000000,
    required: true
  },
  
  fax: {
    type: Number,
    minlength: 10
  },
  
  address: {
    
    street: {
      type: String,
      default: 'Your Street',
      required: true
    },
    
    city: {
      type: String,
      default: 'Your City',
      required: true
    },
    
    state: {
      type: String,
      default: 'Your State',
      required: true
    },
    
    zip: {
      type: Number,
      default: 000000,
      required: true
    }
  
  },
  
  requestedAppearance: {
    type: Array
  },
  
  acceptedAppearances: {
    type: Array
  }
});


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};



var Users = mongoose.model('Users', userSchema);

module.exports = Users;