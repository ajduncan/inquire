/**
 * PublicController
 *
 * @description :: Server-side logic for managing public requests.
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  thanks: function(req, res, next) {
    res.view('public/thanks',
    {
      layout: 'layouts/public'
    });
  },

  saverequest: function(req, res, next) {
    if (req.param('email1') != req.param('email2')) {
      req.session.flash = {
        err: 'Emails do not match.'
      }
      return res.redirect('/public/request');
    }

    var contact_okay = false;
    if (req.param('contact_okay') == 'on') {
      contact_okay = true;
    }

    Request.create(
      {
        name: req.param('name'),
        email: req.param('email1'),
        category: req.param('category'),
        request: req.param('request'),
        contact_okay: contact_okay
      },
      function requestCreated(err, request) {
        if (err) {
          console.log(err);
          req.session.flash = {
            err: err
          };

          return res.redirect('/public/request');
        }
        res.redirect('/public/thanks');
      }
    );
  },

  request: function(req, res, next) {
    Category.find(function foundCategories(err, categories) {
      if (err) return next(err);
      res.view('public/request',
      {
        categories: categories,
        layout: 'layouts/public'
      });
    });
  }

};

