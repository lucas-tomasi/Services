var sanitize = require( 'mongo-sanitize' );

module.exports = function ( app ) 
{

	var City = app.models.City;

	var controller = {};
	
	/*
	 *	returns all records
	 */
	controller.list = function( req, res )
	{
		City.find( {} ).exec(
			
			function( err , cities ) 
			{
		    	if( err ) 
		    	{
		        	res.status(500).json( err );
		      	} 
		      	else 
		      	{
					res.status(200).json( cities );
		      	}
		    });
	};

		/*
	 *	returns all records
	 */
	controller.citiesComposite = function( req, res )
	{
		City.find( {} ).exec(
			
			function( err , cities ) 
			{
		    	if( err ) 
		    	{
		        	res.status(500).json( err );
		      	} 
		      	else 
		      	{
		      		var composite = [];
		      		for( i in cities )
		      		{
		      			composite.push( { id: cities[i]._id , text: cities[i].city + '(' + cities[i].initials + ')'  } );
		      		}
					res.status(200).json( composite );
		      	}
		    });
	};

	/*
	 * returns record by _id
	 */
	controller.get = function( req , res ) 
	{
		var _id = sanitize(req.params.id);

		if( req.params.id !== 'undefined'  )
		{
			City.findOne(
			
			{ _id: _id }).exec(

			function( err, City ) 
			{
				if( err ) 
				{
			    	res.status(500).json( err );
			  	} 
			  	else 
			  	{
			    	res.status(200).json( City );
			  	}
			});
		}
		else
		{
			res.status(200).json( new City() );
		}
	}

	return controller;
}