module.exports = function( app )
{
	var MyAuthenticate = require( '../utils/MyAuthenticate.js' )();

	var controller = app.controllers.ServiceController;

	app.route( '/admin/services' )
		.get( MyAuthenticate.verify, controller.list );
		
	app.route( '/admin/service/:id' )
		.get(    MyAuthenticate.verify , controller.get    )
	    .delete( MyAuthenticate.verify , controller.delete );

	app.route( '/admin/service/' )
		.get( MyAuthenticate.verify , controller.get   )
		.post(MyAuthenticate.verify , controller.store );

	app.route ( '/protected/service/comment/' )
	    .post( MyAuthenticate.verify , controller.saveComment );
	
	app.route( '/public/services' )
		.get( MyAuthenticate.verify, controller.getServicesHome );

	app.route( '/admin/servicesCategoriesDrilldown' )
		.get( MyAuthenticate.verify, controller.getServicesCategoriesDrilldown );

	app.route( '/public/service/:id' )
		.get( MyAuthenticate.verify, controller.get );
}