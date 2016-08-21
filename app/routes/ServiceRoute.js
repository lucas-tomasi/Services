module.exports = function( app )
{
	var MyAuthenticate = require( '../utils/MyAuthenticate.js' )();

	var controller = app.controllers.ServiceController;

	app.route( '/admin/services' )
		.get( MyAuthenticate.verify, controller.list );
		
	app.route( '/public/services' )
		.get( MyAuthenticate.verify, controller.getServicesHome );

	app.route( '/admin/service/:id' )
		.get(    MyAuthenticate.verify , controller.get    )
	    .delete( MyAuthenticate.verify , controller.delete );

	app.route( '/admin/service/' )
		.get( MyAuthenticate.verify , controller.get   )
		.post(MyAuthenticate.verify , controller.store );
}