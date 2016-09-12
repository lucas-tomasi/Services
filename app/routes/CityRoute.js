module.exports = function( app )
{
	var MyAuthenticate = require( '../utils/MyAuthenticate.js' )();
	
	var controller = app.controllers.CityController;

	app.route( '/admin/cities' )
		.get( MyAuthenticate.verify, controller.list );

	app.route( '/protected/citiesComposite' )
		.get( MyAuthenticate.verify, controller.citiesComposite );

	app.route( '/admin/city/:id' )
		.get(    MyAuthenticate.verify , controller.get    )
}		