/**
 * res.request([inputs])
 *
 * @param {String} inputs.name
 * @param {String} inputs.email
 *
 * @description :: Save the request
 * @help        :: See http://links.sailsjs.org/docs/responses
 */

module.exports = function login(inputs) {
  inputs = inputs || {};

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Save the request
  Request.saveRequest({
    name: inputs.name,
    email: inputs.email,
    category: inputs.category,
    request: inputs.request,
    contact_okay: inputs.contact_okay
  }, function (err, request) {
    if (err) return res.negotiate(err);
    if (!request) {

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the login was successful.
      // (also do this if no `invalidRedirect` was provided)
      if (req.wantsJSON || !inputs.invalidRedirect) {
        return res.badRequest('Unable to create request.');
      }
      // Otherwise if this is an HTML-wanting browser, redirect to /login.
      return res.redirect(inputs.invalidRedirect);
    }

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a 200 response letting the user agent know the request creation
    // was successful.  (also do this if no `successRedirect` was provided)
    if (req.wantsJSON || !inputs.successRedirect) {
      return res.ok();
    }

    // Keep the success redirect pattern for now, but it should not be used.
    return res.redirect(inputs.successRedirect);
  });

};

