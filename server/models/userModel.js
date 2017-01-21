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
    
  phone: {
    type: Number,
    minlength: 10,
  },
  
  fax: {
    type: Number,
    minlength: 10
  },

  date: {
    type: Date,
    default: Date.now
  },
  
  address: {
    
    street: {
      type: String,
    },
    
    city: {
      type: String,
    },
    
    state: {
      type: String,
    },
    
    zip: {
      type: Number,
    }
  
  },
  
  requestedAppearance: {
    type: Array
  },
  
  acceptedAppearances: {
    type: Array
  },
  
  messages: {
    
    pendingAppearances: {
     
     pendingRequestedAppearances: [{
       appearanceId: {
        type: String
       }
     }],
     
     pendingAcceptedAppearance: [{
       appearanceId: {
        type: String
       }
     }], 
      
    }
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