module.exports = function( app )
{
	var MyAuthenticate = require( '../utils/MyAuthenticate.js' )();
	
	var controller = app.controllers.CategoryController;

	app.route( '/admin/categories' )
		.get( MyAuthenticate.verify, controller.list );

	app.route( '/public/categoriesComposite' )
		.get( MyAuthenticate.verify, controller.getCategoriesComposite );

	app.route( '/admin/category/:id' )
		.get(    MyAuthenticate.verify , controller.get    )
	    .delete( MyAuthenticate.verify , controller.delete );

	app.route( '/admin/category/' )
		.get( MyAuthenticate.verify , controller.get   )
		.post(MyAuthenticate.verify , controller.store );
}