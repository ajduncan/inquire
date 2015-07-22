/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  new: function(req, res) {
    res.view('category/new'); // should default to category/new.
  },

  create: function(req, res, next) {
    // Create a Category:
    // TODO: check if the name exists first instead of flashing error?
    Category.create(
      {
        name: req.param('name')
      },
      function categoryCreated(err, category) {
        if (err) {
          req.session.flash = {
            err: err
          };

          return res.redirect('/category/new');
        }

        // res.redirect('/category/show/' + category.id);
        res.redirect('/category/index');
      }
    );
  },

  edit: function(req, res, next) {
    Category.findOne(
      req.param('id'),
      function foundCategory(err, category) {
        if (err) return next(err);
        if (!category) return next("Category ID doesn't exist.");

        res.view('category/edit', // should default to category/edit.
        {
          category: category
        });
      }
    );
  },

  update: function(req, res, next) {
    Category.update(
      req.param('id'),
      req.params.all(),
      function categoryUpdated(err) {
        if (err) {
          req.session.flash = {
            err: err
          };

          return res.redirect('/category/edit/' + req.param('id'));
        }
        res.redirect('/category/index');
      }
    );
  },

  destroy: function(req, res, next) {
    Category.findOne(
      req.param('id'),
      function foundCategory(err, category) {
        if (err) return next(err);
        if (!category) return next("Category ID doesn't exist.");

        Category.destroy(
          req.param('id'),
          function categoryDestroyed(err) {
            if (err) return next(err);
          }
        );

        res.redirect('/category/index');
      }
    );
  },

  show: function(req, res, next) {
    Category.findOne(
      req.param('id'),
      function foundCategory(err, category) {
        if (err) return next(err);
        if (!category) return next();
        res.view('category/show', // should default to category/show.
        {
          category: category
        });
      }
    );
  },

  index: function(req, res, next) {
    Category.find(function foundCategories(err, categories) {
      if (err) return next(err);
      res.view('category/index', // should default to category/index.
      {
        categories: categories
      });
    });
  }

};

