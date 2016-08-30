module.exports = function( app )
{
	var MyAuthenticate = require( '../utils/MyAuthenticate.js' )();
	
	var controller = app.controllers.ReserveController;

	app.route( '/public/reservations/service/:id' )
		.get( MyAuthenticate.verify, controller.getReserveByService );

	app.route( '/public/reservations/user/:id' )
		.get( MyAuthenticate.verify, controller.getReserveByUser );
}
