var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bson = require('bson');
var app = express();
var unorm = require('unorm');
var constants = require('./constants.js')
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var configPassport = require('./config/passport.js')(passport);
//add route to app
// set up handlebars view engine
var handlebars = require('express3-handlebars' ).create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        static: function(name) {
            return require('./lib/static.js').map(name);
        }
    }

});

app.engine('handlebars', handlebars.engine);


// set handle bar layout
app.set('view engine','handlebars');
//set application port
app.set('port',process.env.PORT || 4000);


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('cors' )());
app.use(express.static(__dirname + '/public'));
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


mongoose.connect('mongodb://localhost:27017/mumandkid', function (error) {
    if (error) {
        console.log(error);
    }
});


app.use(function(err,req, res, next){
    console. error(err. stack);
    res. status(404);
    res. render('404' );
});


app.use(function(err, req, res, next){
    console. error(err. stack);
    res. status(500);
    res. render('500' );
});



// set application lister port
app.listen(app. get('port' ), function(){
    console. log( 'Express started on http://localhost:' +
    app. get('port' ) + '; press Ctrl-C to terminate.' );
});
//################# ROUTING ################
require('./routes.js' )(app,passport);