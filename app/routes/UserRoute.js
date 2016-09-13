module.exports = function( app )
{
	var MyAuthenticate = require( '../utils/MyAuthenticate.js' )();

	var controller = app.controllers.UserController;
	
	app.route( '/admin/users' )
		.get( MyAuthenticate.verify, controller.list );

	app.route( '/public/userLogged' )
		.get( MyAuthenticate.verify, controller.getUserLogged );

	app.route( '/admin/userReport' )
		.get( MyAuthenticate.verify, controller.genereteReport );

	app.route( '/admin/professionalsComposite' )
		.get( MyAuthenticate.verify, controller.getProfessionalsComposite );

	app.route( '/admin/user/:id' )
		.get(    MyAuthenticate.verify , controller.get    )
	    .delete( MyAuthenticate.verify , controller.delete );

	app.route( '/protected/user/' )
		.post(MyAuthenticate.verify , controller.store );

	app.route( '/protected/user/address' )
		.post(MyAuthenticate.verify , controller.saveAddress );

	app.route( '/admin/user/' )
		.get( MyAuthenticate.verify , controller.get   );
}