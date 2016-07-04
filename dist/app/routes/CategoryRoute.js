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
	var controller = app.controllers.CategoryController;

	app.route( '/categories' )
		.get( verifyAuthenticate, controller.list );

	app.route( '/category/:id' )
		.get(    verifyAuthenticate , controller.get    )
	    .delete( verifyAuthenticate , controller.delete );

	app.route( '/category/' )
		.get( verifyAuthenticate , controller.get   )
		.post(verifyAuthenticate , controller.store );
}