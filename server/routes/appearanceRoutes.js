var appearanceController = require('../controllers/appearanceController.js');
var bodyParser = require('body-parser');

module.exports = function(app) {
  
  app.use(bodyParser.json());
  
  app.use(bodyParser.urlencoded({ extended: true}));
  
  // route for getting all appearances
  app.get('/api/appearances', appearanceController.getAllAppearances);
  
  // route for getting appearance by type
  app.get('/api/appearances/:type', appearanceController.getAppearanceByType);
  
  // route for creating appearance
  app.post('/api/appearances', appearanceController.createAppearance);
  
  // route for deleting a user
  app.delete('/api/appearances/:id', appearanceController.deleteAppearance);
  
  // route for updating a user
  app.post('/api/appearances/:id', appearanceController.updateAppearance);
  
  app.get('/home/appearances', appearanceController.getAppearancesByUserId);
  
  
  app.get('/home/appearances/edit_appearance/:id', appearanceController.getAppearanceById);
}