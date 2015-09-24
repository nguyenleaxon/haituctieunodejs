var passport = require('passport');


module.exports = {
    registerRoutes: function (app) {
        app.get("/", this.login);
        app.get("/logout",this.logout);
        app.get("/home",this.home);
        app.get("/signup",this.signup);
        app.post("/login",passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    },

    home : function(req,res,next){
        res.render('home');
    },

    signup : function(req,res,next){
        res.render('signup');
    },

    login : function (req, res, next) {
        res.render('login',{ message: req.flash('loginMessage') });
    },

    logout : function(req, res){
        req.logout();
        res.redirect('/');
    },





};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}