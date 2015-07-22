/**
* Request.js
*
* @description :: This model represents incoming requests.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    submit_date: {
      type: 'datetime',
      required: true,
      defaultsTo: new Date()
    },
    processed_date: {
      type: 'datetime',
      required: false
    },
    ineligible: {
      type: 'boolean',
      required: false,
      defaultsTo: false
    },
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    category: {
      model: 'category',
      required: true
    },
    request: {
      type: 'text',
      required: true
    },
    contact_okay: {
      type: 'boolean',
      required: false,
      defaultsTo: false
    }
  },

  saveRequest: function (inputs, cb) {
    // Create a request
    Request.create({
      name: inputs.name,
      email: inputs.email,
      category: inputs.category,
      request: inputs.request,
      contact_okay: inputs.contact_okay
    })
    .exec(cb);
  }

};

