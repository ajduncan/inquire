var request = require('supertest');
var agent = request.agent;
var auth = require('../auth');


describe('RequestController', function() {
  var authenticated;
  var anonymous;

  before(function(done) {
    auth.login(function(loggedInAgent) {
      authenticated = loggedInAgent;
      anonymous = agent(sails.hooks.http.app);
      done();
    });
  });

  describe('index', function() {
    it('should fail to access restricted request page', function (done) {
      anonymous
        .get('/request')
        .expect(403, done);
    });

    it('should sign in', function (done) {
      anonymous
        .post('/login')
        .send({ email: 'admin@test.com', password: '1234' })
        .expect(200, done);
    });

    it('should access request page', function (done) {
      authenticated
        .get('/request')
        .expect(200, done);
    });
  });

});
