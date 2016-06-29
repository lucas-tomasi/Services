var express        = require( 'express' )
  , load           = require( 'express-load' )
  , bodyParser     = require( 'body-parser' )
  , methodOverride = require( 'method-override' )
  , cookie         = require( 'cookie-parser' )
  , session        = require( 'express-session' )
  , passport       = require( 'passport' );

module.exports = function()
{
	var app = express();

	app.set( 'port', 8000 );

	app.use( cookie() );

	app.use( session( {
		secret: 'seninha',
		resave: true,
		saveUninitialized: true
	}));

	app.use( passport.initialize() );
	app.use( passport.session() );

	app.use( express.static( './public' ) );	
	
	app.set( 'view engine', 'ejs' );
	app.set( 'views', './app/views' );
	
	app.use( bodyParser.urlencoded( { extended: true } ) );
	app.use( bodyParser.json() );
	app.use( methodOverride() );

	load( 'models' , { cwd : 'app' } )
	  .then( 'controllers' )
	  .then( 'routes' )
	  .into( app );

	return app;
}
