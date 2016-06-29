module.exports = function( app )
{
	var controller = app.controllers.HomeController;
	
	app.get( '/', controller.index );
}