var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var appearanceSchema = new Schema({
  
  reqAttorney: {
    type: String,
    required: true
  },
  
  appAttorney: {
    type: String,
    default: 'N/A'
  },
  
  caseHeader: {
    type: String,
    required: true
  },
  
  caseNumber: {
    type: String,
    required: true
  },
  
  caseType: {
    type: String,
    required: true
  },
  
  appearanceType: {
    type: String,
    required: true
  },
  
  appearanceDate: {
    type: Date,
    required: true
  },
  
  appearanceTime: {
    type: String,
    required: true
  },
  
  clientInfo: {
    
    name: {
      type: String,
      required: true
    },
    
    clientType: {
      type: String,
      required: true
    },
    
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: '{VALUE} is not a valid phone number!'
      },
      required: [true, 'User phone number required']
    },
    
    email: {
      type: String
    },
    
    street: {
      type: String
    },
    
    city: {
      type: String
    },
    
    state: {
      type: String
    },
    
    zip: {
      type: Number
    }
    
  },

  courtInfo: {
    
    courtName: {
      type: String,
      required: true
    },
    
    judgeName: {
      type: String,
      required: true
    },
    
    courtAddress: {
      
      street: {
        type: String,
        required: true
      },
      
      city: {
        type: String,
        required: true  
      },
      
      county: {
        type: String,
        required: true
      },
      
      state: {
        type: String,
        required: true
      },
      
      zip: {
        type: Number,
        required: true
      }
      
    }
    
  },
  
  miscellaneous_info: {
    type: String
  }

});

var Appearance = mongoose.model('Appearance', appearanceSchema); 

module.exports = Appearance;