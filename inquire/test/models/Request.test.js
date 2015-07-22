  describe('Request', function() {
    it ('should not be empty', function(done) {
      Request.find().exec(function(err, requests) {
        requests.length.should.not.be.eql(0);
        done();
      });
    });
  });
