var mongoose = require('mongoose');
var connection;
module.exports = function ( uri ) 
{
	connection = mongoose.connect( uri );	 

	mongoose.connection.on( 'connected' , 
		function () 
		{
			console.log( 'Mongo Connected from '+ uri ); 
		});
	
	mongoose.connection.on( 'disconnected' , 
		function () 
		{
			console.log( 'Mongo Disconnected to '+ uri ); 
		});

	mongoose.connection.on( 'error' , 
		function ( error ) 
		{
			console.log( 'Mongo witch error: '+ error ); 
		});
}