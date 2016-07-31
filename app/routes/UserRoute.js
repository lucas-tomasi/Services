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
	var controller = app.controllers.UserController;

	app.route( '/users' )
		.get( verifyAuthenticate, controller.list );

	app.route( '/userLogged' )
		.get( verifyAuthenticate, controller.getUserLogged );

	app.route( '/userReport' )
		.get( verifyAuthenticate, controller.genereteReport );

	app.route( '/professionalsComposite' )
		.get( verifyAuthenticate, controller.getProfessionalsComposite );

	app.route( '/user/:id' )
		.get(    verifyAuthenticate , controller.get    )
	    .delete( verifyAuthenticate , controller.delete );

	app.route( '/user/' )
		.get( verifyAuthenticate , controller.get   )
		.post(verifyAuthenticate , controller.store );
}