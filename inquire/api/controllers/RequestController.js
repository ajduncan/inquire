/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  new: function(req, res) {
    Category.find(function foundCategories(err, categories) {
      if (err) return next(err);
      res.view('request/new', {
        categories: categories
      });
    });
  },

  create: function(req, res, next) {
    // Create a Request:
    Request.create({
      name: req.param('name'),
      email: req.param('email'),
      category: req.param('category'),
      request: req.param('request'),
      contact_okay: req.param('contact_okay')
      },
      function requestCreated(err, request) {
        if (err) {
          console.log(err);
          req.session.flash = {
            err: err
          };

          return res.redirect('/request/new');
        }
        res.redirect('/request/index');
      }
    );
  },

  edit: function(req, res, next) {
    Request.findOne(
      req.param('id'),
      function foundRequest(err, request) {
        if (err) return next(err);
        if (!request) return next("Request ID doesn't exist.");

        Category.find(function foundCategories(err, categories) {
          if (err) return next(err);
          if (!categories) return next();

          res.view('request/edit',
          {
            request: request,
            categories: categories
          });
        });
      }
    );
  },

  update: function(req, res, next) {
    var moment = require('moment');

    if (req.param('processed') == "true") {
      var processed_date = moment().utc().format('YYYY-MM-DD HH:mm:ss Z');
    } else {
      var processed_date = null;
    }

    Request.update(
      { id: req.param('id') },
      {
        processed_date: processed_date,
        name: req.param('name'),
        email: req.param('email'),
        request: req.param('request'),
        category: req.param('category'),
        ineligible: req.param('ineligible'),
        contact_okay: req.param('contact_okay')
      },
      function requestUpdated(err) {
        if (err) {
          req.session.flash = {
            err: err
          };

          return res.redirect('/request/edit/' + req.param('id'));
        }
        res.redirect('/request/index');
      }
    );
  },

  destroy: function(req, res, next) {
    Request.findOne(
      req.param('id'),
      function foundRequest(err, request) {
        if (err) return next(err);
        if (!request) return next("Request ID doesn't exist.");

        Request.destroy(
          req.param('id'),
          function requestDestroyed(err) {
            if (err) return next(err);
          }
        );

        res.redirect('/request/index');
      }
    );
  },

  show: function(req, res, next) {
    Request.findOne(
      req.param('id'),
      function foundRequest(err, request) {
        if (err) return next(err);
        if (!request) return next();

        Category.find(function foundCategories(err, categories) {
          if (err) return next(err);
          if (!categories) return next();
          res.view('request/show',
          {
            request: request,
            categories: categories
          });
        });
      }
    );
  },

  processgroup: function(req, res, next) {
    var moment = require('moment');
    var processed_date = moment().utc().format('YYYY-MM-DD HH:mm:ss Z');

    Request.update(
      { id: req.param('group')},
      {processed_date: processed_date})
    .exec(
      function processGroupRequests(err, requests) {
        if (err) return next(err);
        res.redirect('/request/index');
      }
    );
  },

  group: function(req, res, next) {
    Request.find()
    .where({ id: req.param('group')})
    .populate('category')
    .sort({category: 'asc'})
    .exec(
      function foundGroupRequests(err, requests) {
        if (err) return next(err);

        res.view('request/group', { requests: requests });
      }
    );
  },

  index: function(req, res, next) {
    Request.find()
    .where({ processed_date: null})
    .populate('category')
    .exec(
      function foundProcessedRequests(err, unprocessed_requests) {
        if (err) return next(err);

        Request.find()
        .where({processed_date: { '!': null }})
        .populate('category')
        .exec(
          function foundRequests(err, processed_requests) {
            res.view('request/index',
            {
              processed_requests: processed_requests,
              unprocessed_requests: unprocessed_requests
            });
        });
    });
  }

};

