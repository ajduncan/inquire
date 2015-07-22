/**
* User.js
*
* @description :: Server-side model for managing users
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },

  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      email: inputs.email,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
  }
};
