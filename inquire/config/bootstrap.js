/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  _.extend(sails.hooks.http.app.locals, sails.config.http.locals);

  // Are there any users?  If not, add an admin user.
  // TODO: set this from the environment or do not create one.
  User.find().limit(1).exec(function(err, user) {
    if (!user) {
      User.create({
        email: "admin@test.com",
        password: "1234"
      }).exec(function(err, user) {
        if (err) {
          console.log('Could not create a default user: ' + err);
        } else {
          console.log('Created a default user.');
        }
      });
    }
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
