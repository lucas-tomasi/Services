module.exports = function( app )
{
	var controller = app.controllers.CategoryController;

	app.get('/categories'      , controller.list   );
	app.get('/category/:id'    , controller.get    );
	app.get('/category/'       , controller.get    );
	app.delete('/category/:id' , controller.delete );
	app.post('/category/'      , controller.store  );
}