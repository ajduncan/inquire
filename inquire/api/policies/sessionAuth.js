/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  function setFlash() {
    res.locals.flash = {};

    if (req.session.flash) {
      res.locals.flash = _.clone(req.session.flash);

      // clear flash
      req.session.flash = {};
    }
  }

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    setFlash();
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
