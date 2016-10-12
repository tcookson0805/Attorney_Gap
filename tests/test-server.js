var config = require('../server/config/config');

global.DATABASE_URL = ;

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server/server.js');

var Appearance = require('../server/models/appearanceModel.js');
var User = require('../server/models/userModel.js');

chai.use(chaiHttp);

describe('Appearances', function() {
  
  before(function(done) {
    server.runServer(function() {
      Appearance.create({}, function() {
        done();
      })
    });
  });
  
  it('should list Appearances on get', function() {
    chai.request(app);
  })
  
})