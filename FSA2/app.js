/**
 * Module dependencies.
 */

// mongoose setup
require( './db' );



var express        = require( 'express' );
var http           = require( 'http' );
var path           = require( 'path' );
var engine         = require( 'ejs-locals' );
var favicon        = require( 'serve-favicon' );
var cookieParser   = require( 'cookie-parser' );
var session = require('express-session');
var bodyParser     = require( 'body-parser' );
var passport = require('passport');
var flash = require('connect-flash');
var methodOverride = require( 'method-override' );
var logger         = require( 'morgan' );
var errorHandler   = require( 'errorhandler' );
var static         = require( 'serve-static' );
var MongoStore = require('connect-mongo/es5')(session);
var mongoose = require('mongoose');
var db = mongoose.connect( 'mongodb://localhost/express-todo' );

require('./config/passport')(passport);




var app    = express();
//var routes = require( './routes' );






// all environments
app.set( 'port', process.env.PORT || 3001 );
app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );
app.use( favicon( __dirname + '/public/images/favicon.ico' ));
app.use( logger( 'dev' ));
app.use( methodOverride());
app.use( cookieParser());
app.use( bodyParser.json());
//app.use( bodyParser.urlencoded({ extended : true }));
//app.use(morgan('dev'));
	//app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(session({secret: 'anystringoftext',
					 saveUninitialized: true,
					 resave: true,
					 store: new MongoStore({mongooseConnection: mongoose.connection,
											ttl: 4 * 24 * 60 * 60})}));
					 
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());



//app.use('/index', users);

app.use( static( path.join( __dirname, 'public' )));
require( './app/routes.js' )(app, passport);

// development only
if( 'development' == app.get( 'env' )){
  app.use( errorHandler());
}

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});
