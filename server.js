var http   = require( 'http' );
var config = require( 'node-ini' );
var app    = require( './config/express' )();
var db     = require( './config/database.js');

config.parse( './config/db.ini' , function ( error , config ) {
		if (!error) {
			db( config.type + '://' + config.user + ':' + config.pwd  +'@' + config.host +':' + config.port + '/' + config.name );
		};
});

http.createServer( app ).listen( 
	app.get( 'port' ), function() {
			console.log( 'Express Server executando na porta ' + app.get( 'port' ) );
}); 