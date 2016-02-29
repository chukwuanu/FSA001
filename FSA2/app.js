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
var bodyParser     = require( 'body-parser' );
var methodOverride = require( 'method-override' );
var logger         = require( 'morgan' );
var errorHandler   = require( 'errorhandler' );
var static         = require( 'serve-static' );
var mongoose = require('mongoose');
var db = mongoose.connect( 'mongodb://localhost/express-todo' );




var app    = express();
var routes = require( './routes' );






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
app.use( bodyParser.urlencoded({ extended : true }));


// Routes
app.use( routes.current_user );
app.get(  '/',  routes.index);
app.get(  '/add_user',    routes.add_user );
app.get(  '/view_users',  routes.view_users );
app.get(  '/add_sites',   routes.add_sites );
app.get(  '/view_sites',  routes.view_sites );
app.get(  '/view_dgs',    routes.view_dgs);
app.get(  '/view_fuel_del',    routes.view_fuel_del);
app.get(  '/view_site_mat_del',    routes.view_site_mat_del);
app.get(  '/view_eco',    routes.view_eco);

//Routes For Mobile App Data
app.post( '/index_gps', routes.index_gps );
app.post( '/index_dgs', routes.index_dgs );
app.post( '/index_fd',  routes.index_fd );
app.post( '/index_smd', routes.index_smd );
app.post( '/index_eco', routes.index_eco );
app.post( '/index_app', routes.index_app );
app.post( '/index_populate_sites', routes.index_populate_sites );






app.post( '/create',      routes.create );
app.post( '/create_site',      routes.create_site );

app.get(  '/destroy/:id', routes.destroy );
app.get(  '/destroy_site/:id', routes.destroy_site );

app.get(  '/edit/:id',    routes.edit );
app.get(  '/edit_sites/:id',    routes.edit_sites );
app.get(  '/view_field_dgs/:id/:id2?',  routes.view_field_dgs);
app.get(  '/view_field_fuel_del/:id/:id2?',  routes.view_field_fuel_del);
app.get(  '/view_field_site_mat_del/:id/:id2?',  routes.view_field_site_mat_del);
app.get(  '/view_field_eco/:id/:id2?',    routes.view_field_eco);

app.post( '/update/:id',  routes.update );
app.post( '/update_site/:id',  routes.update_site );

//app.use('/index', users);

app.use( static( path.join( __dirname, 'public' )));

// development only
if( 'development' == app.get( 'env' )){
  app.use( errorHandler());
}

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});
