var MyController = require( '../utils/MyController.js' );

module.exports = function ( app ) 
{
	var City = app.models.City;

	var CityController = new MyController( City , {} );

	/*
	 *	returns all records formatados
	 */
	CityController.citiesComposite = function( req, res )
	{
		City.find( {} ).exec(
		function( err , cities ) {
	    	if( err ) {
	        	res.status(500).json( err );
	      	} else {
	      		var composite = [];
	      		for( i in cities ) {
	      			composite.push( { id: cities[i]._id , text: cities[i].city + ' (' + cities[i].initials + ')'  } );
	      		}
				res.status(200).json( composite );
	      	}
	    });
	};
	
	return CityController;
};