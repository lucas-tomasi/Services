var express        = require( 'express' )
  , load           = require( 'express-load' )
  , bodyParser     = require( 'body-parser' )
  , methodOverride = require( 'method-override' )
  , cookie         = require( 'cookie-parser' )
  , session        = require( 'express-session' )
  , passport       = require( 'passport' )
  , helmet         = require( 'helmet' );

module.exports = function()
{
	var app = express();

	app.set( 'port', 8000 );
	//
	// init passport
	// 
	app.use( cookie() );

	app.use( session( {
		secret: 'seninha',
		resave: true,
		saveUninitialized: true
	}));

	app.use( passport.initialize() );
	app.use( passport.session() );
	//
	
	//
	// init security
	//
	app.use( helmet() );
	app.use( helmet.hidePoweredBy( {setTo: 'PHP 5.5.14' } ));
	app.use( helmet.frameguard() );
	app.use( helmet.xssFilter() );
	app.use( helmet.noSniff() );
	app.disable( 'x-powered-by' );
	//

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

	// page default not found
	app.get( '*' , function ( req , res ) {
		res.status(404).render('404'); 
	});

	return app;
}
