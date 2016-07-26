var MyController = require( '../utils/MyController.js' );

module.exports = function ( app ) 
{
	var Category = app.models.Category;

	var CategoryController = new MyController( Category , { active: true } );

	CategoryController.getCategoriesComposite = function( req, res ) {	
		
		Category.find( {} ).exec(
			
		function( err , categories ) {
	    	if( err ) {
	        	res.status(500).json( err );
	      	} else {
	      		
	      		var composite = [];
	      		for( i in categories ) {
	      			composite.push( { id: categories[i]._id , text: categories[i].name } );
	      		}
				res.status(200).json( composite );
	      	}
	    });
	};

	return CategoryController;
};