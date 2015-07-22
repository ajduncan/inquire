/**
 * res.category([inputs])
 *
 * @param {String} inputs.name
 *
 * @description :: Save the category
 * @help        :: See http://links.sailsjs.org/docs/responses
 */

module.exports = function login(inputs) {
  inputs = inputs || {};

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Save the category
  Category.saveCategory({
    name: inputs.name,
  }, function (err, category) {
    if (err) return res.negotiate(err);
    if (!category) {

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the login was successful.
      // (also do this if no `invalidRedirect` was provided)
      if (req.wantsJSON || !inputs.invalidRedirect) {
        return res.badRequest('Unable to create category.');
      }
      // Otherwise if this is an HTML-wanting browser, redirect to /login.
      return res.redirect(inputs.invalidRedirect);
    }

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a 200 response letting the user agent know the category creation
    // was successful.  (also do this if no `successRedirect` was provided)
    if (req.wantsJSON || !inputs.successRedirect) {
      return res.ok();
    }

    // Keep the success redirect pattern for now, but it should not be used.
    return res.redirect(inputs.successRedirect);
  });

};
