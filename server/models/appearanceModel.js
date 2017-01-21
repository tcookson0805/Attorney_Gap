var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var appearanceSchema = new Schema({
  
  reqAttorneyId: {
    type: String
  },

  reqAttorney: {

    firstName: {
      type: String,
    },
    lastName: {
      type: String
    },
    firmName: {
      type: String
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    fax: {
      type: Number,
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
        type: Number
      }
    },
    id: {
      type: String,
    }

  },
  
  appAttorney: {
    type: String,
    default: 'N/A'
  },
  
  caseHeader: {
    type: String,
    required: false
  },
  
  caseNumber: {
    type: String,
    required: false
  },
  
  caseType: {
    type: String,
    required: false
  },
  
  appearanceType: {
    type: String,
    required: false
  },
  
  appearanceDate: {
    type: String,
    required: false
  },
  
  appearanceTime: {
    type: String,
    required: false
  },
  
  clientInfo: {
    
    name: {
      type: String,
      required: false
    },
    
    clientType: {
      type: String,
      required: false
    },
    
    phone: {
      type: String,
      required: false
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
      required: false
    },
    
    judgeName: {
      type: String,
      required: false
    },
    
    courtAddress: {
      
      street: {
        type: String,
        required: false
      },
      
      city: {
        type: String,
        required: false  
      },
      
      county: {
        type: String,
        required: false
      },
      
      state: {
        type: String,
        required: false
      },
      
      zip: {
        type: Number,
        required: false
      }
      
    }
    
  },

  filled: {
    type: Boolean,
    default: false
  },

  date: {
    type: Date,
    default: Date.now
  },
  
  instructions: {
    type: String
  }

});

var Appearance = mongoose.model('Appearance', appearanceSchema); 

module.exports = Appearance;