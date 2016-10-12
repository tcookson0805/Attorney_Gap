var AppearanceModel = require('../models/appearanceModel');
var UserModel = require('../models/userModel');


module.exports = {
  
  // CREATE
  
  createAppearance : function(req, res, next) {
    
    console.log('appearance date', req.body.appearance_date);
    console.log('appearance time', req.body.appearance_time);
    console.log('appearance date type', typeof req.body.appearance_date);
    console.log('appearance time type', typeof req.body.appearance_time);
    
    
    var newAppearance = AppearanceModel({
      
      reqAttorney: req.session.passport.user,
      caseHeader: req.body.case_header,
      caseNumber: req.body.case_number,
      caseType: req.body.case_type,
      appearanceType: req.body.appearance_type,
      appearanceDate: new Date(req.body.appearance_date).toISOString(),
      appearanceTime: req.body.appearance_time,
      clientInfo: { 
        name: req.body.client_name,
        clientType: req.body.client_type,
        phone: req.body.client_phone,
        email: req.body.client_email,
        street: req.body.client_street,
        city: req.body.client_city,
        state: req.body.client_state,
        zip: req.body.client_zip
      },
      courtInfo: {
        courtName: req.body.court_name,
        judgeName: req.body.court_judge,
        courtAddress: {
          street: req.body.court_street,
          city: req.body.court_city,
          county: req.body.court_county,
          state: req.body.court_state,
          zip: req.body.court_zip
        }
      },
      miscellaneous_info: req.body.miscellaneous_info
    });
        
    newAppearance.save(function(err, appearance) {
      if(err) {
        throw err;
      }
      res.redirect('/home');
    });
    
  },
  
  // READ 
  
  getAllAppearances : function(req, res, next) {
    
    AppearanceModel.find({}, function(err, appearances){
      if(err) {
        throw err;
      }
      res.send(appearances);
    });
    
  },
  
  getAppearancesByUserId : function(req, res, next) {
    
    // variables to be passed in res.render
    var user = req.user
    var acceptedAppearances;
    var requestedAppearances;
    var attorneys = [{}];

    // variables used to hold queried information
    var attorneysArray = []
    var attorneysQuery;

    
    // db query to find requested appearances by User
    AppearanceModel.find({reqAttorney: req.user._id}).exec()

      .then(function(requested) {
        // set requestedAppearances
        requestedAppearances = requested
        // db query to find accepted appearances by User
        return AppearanceModel.find({appAttorney: req.user._id}).exec()
      })
      
      .then(function(accepted) {
        //set acceptedAppearances
        acceptedAppearances = accepted
        // fill attorneysArray to be used in UserModel.find & fill attorneys array obj to be passed thru on render
        requestedAppearances.forEach(function(appearance) {
          if(appearance.appAttorney !== 'N/A') {
            attorneys[0][appearance.appAttorney] = {}
            attorneysArray.push(appearance.appAttorney)
          }
        });
        return attorneys        
      })
      
      .then(function(data) {
        // fill attorneysArray to be used in UserModel.find & fill attorneys array obj to be passed thru on render
        acceptedAppearances.forEach(function(app) {
          if(!attorneys[0].hasOwnProperty(app.reqAttorney)) {
            attorneys[0][app.reqAttorney] = {}
            attorneysArray.push(app.reqAttorney);
          }
        })
        return attorneysArray
      })
      
      .then(function(data) {
        // database call to get all info on attorneys in attorneysArray
        return UserModel.find({ '_id': { $in: attorneysArray}}).exec()
      })
      
      .then(function(attys) {
        // setting attorneysQuery to result of db request
        attorneysQuery = attys
        // filling attorneys array obj with info on each attorney
        attorneysQuery.forEach(function(query) {
          attorneys[0][query._id] = query;
        })
        return attorneysQuery
      })
      .then(function(data) {
        res.render('pages/appearances', {user: user, acceptedAppearances: acceptedAppearances, requestedAppearances: requestedAppearances, attorneys: attorneys});
      });
    
  },
  
  something : function(req, res, next) {
    console.log(req.body);
  },
  
  getAppearanceById : function(req, res, next) {
    
    AppearanceModel.findOne({_id : req.params.id}, function(err, appearance) {
      if(err) {
        throw err;
      }

      res.render('pages/edit_appearance', { user: req.user, appearance: appearance });
    });
    
    
  },
  
  getAppearanceByType : function(req, res, next) {
    
    AppearanceModel.find({ type: req.params.type }, function(err, appearance) {
      if(err) {
        throw err;
      }
      
      res.redirect('/home/appearance_search');
    });
  
  },
  
  // UPDATE
  
  updateAppearance : function(req, res, next) {
    
    var set = {
      $set: req.body
    }
    
    console.log('######', set)
    
   AppearanceModel.findOneAndUpdate({_id: req.params.id}, set, {upsert:true}, function(err, user){
      if(err){
        throw err;
      }
      res.redirect('/home')
    });
    
  },
  
  // DELETE
  
  deleteAppearance : function(req, res, next) {
    
    AppearanceModel.findOneAndRemove({ _id: req.params.id }, function(err, user) {
      if(err) {
        throw err;
      }
      res.send('Deleted ' + user);
      
    });
    
  }
}

