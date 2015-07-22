  var Sails = require('sails');
  var fs = require('fs');
  var Barrels = require('barrels');
  require('should');

  // Global before hook
  before(function (done) {
    fs.unlink('.tmp/localDiskDb.db', function unlinkDone(error) {
      // Lift Sails with test database
      Sails.lift({
        log: {
          level: 'error'
        },
        models: {
          connection: 'test',
          migrate: 'drop'
        },
        environment: 'development',
        hooks: {
          grunt: false
        }
      }, function(err) {
        if (err)
          return done(err);

        var _ = require('lodash');
        var barrels = new Barrels();
        var fixtures = _.keys(barrels.data);

        barrels.populate(fixtures, function(err) {
          if (err)
            console.log('Error loading fixtures: ' + err);
          done(err);
        }, false);

      });
    });
  });

  // Global after hook
  after(function (done) {
    console.log(); // Skip a line before displaying Sails lowering logs
    Sails.lower(done);
  });
