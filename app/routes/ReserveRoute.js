module.exports = function( app )
{
	var MyAuthenticate = require( '../utils/MyAuthenticate.js' )();
	
	var controller = app.controllers.ReserveController;

	app.route( '/public/reservations/service/:id' )
		.get( MyAuthenticate.verify, controller.getReserveByService );

	app.route( '/protected/reservations/user/:id' )
		.get( MyAuthenticate.verify, controller.getReserveByUser );
	
	app.route( '/protected/reservations/professional/:id' )
		.get( MyAuthenticate.verify, controller.getReserveByProfessional );
	
	app.route( '/protected/reserve/store' )
		.post( MyAuthenticate.verify, controller.store );
}
