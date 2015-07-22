/**
* User.js
*
* @description :: Server-side model for request categories
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
    name: {
      type: 'string',
      unique: true,
      required: true
    }
  }

};
