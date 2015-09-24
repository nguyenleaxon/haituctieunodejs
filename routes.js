var videoController = require('./controllers/video.js' );
var categoryController = require('./controllers/category.js');
var authenticationController = require('./controllers/authentication.js');

module.exports = function(app){
    videoController.registerRoutes(app);
    categoryController.registerRoutes(app);
    authenticationController.registerRoutes(app);


};