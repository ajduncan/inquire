  describe('User', function() {
    it ('should not be empty', function(done) {
      User.find().exec(function(err, users) {
        users.length.should.not.be.eql(0);
        done();
      });
    });
  });
