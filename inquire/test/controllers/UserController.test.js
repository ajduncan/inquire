var request = require('supertest');

describe('UserController', function() {
  describe('index', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/user')
        .expect(200, done);
    });
  });
});
