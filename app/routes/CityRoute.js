function verifyAuthenticate( req , res , next ) 
{
	 if ( req.isAuthenticated() ) 
	 {
	 	return next();
	 } 
	 else 
	 {
		res.status('401').render(401);	 	
	 }
}

module.exports = function( app )
{
	var controller = app.controllers.CityController;

	app.route( '/cities' )
		.get( verifyAuthenticate, controller.list );

	app.route( '/citiesComposite' )
		.get( verifyAuthenticate, controller.citiesComposite );

	app.route( '/city/:id' )
		.get(    verifyAuthenticate , controller.get    )
}		