var Category = require('../models/category.js');

module.exports = {
    registerRoutes: function (app) {
        app.post("/categories", this.categories);
        app.get("/webcategories",this.webcategories);
    },

    categories: function (req, res, next) {
        Category.find({}, function (err, categories) {
            if (err) return res.send(500, 'Error occurred: database error.');
            console.log(categories);
            res.json(categories.map(function (returnCategory) {
                return {
                    name: returnCategory.name,
                    id: returnCategory._id,
                    description: returnCategory.description,
                    imagePath : returnCategory.imagePath
                }
            }));
        });
    },

    webcategories : function(req, res, next) {
    /*    Category.find({}, function (err, categories) {
            if (err) return res.send(500, 'Error occurred: database error.');
            console.log(categories);
            res.json(categories.map(function (returnCategory) {
                return {
                    name: returnCategory.name,
                    id: returnCategory._id,
                    description: returnCategory.description,
                    imagePath : returnCategory.imagePath
                }
            }));
        });*/
        res.render('category');
    }

}