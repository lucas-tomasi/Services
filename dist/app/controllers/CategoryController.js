var sanitize = require( 'mongo-sanitize' );

module.exports = function ( app ) 
{

	var Category = app.models.Category;

	var controller = {};
	
	/*
	 *	returns all records
	 */
	controller.list = function( req, res )
	{
		Category.find( {} ).exec(
			
			function( err , categories ) 
			{
		    	if( err ) 
		    	{
		        	res.status(500).json( err );
		      	} 
		      	else 
		      	{
					res.status(200).json( categories );
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
			Category.findOne(
			
			{ _id: _id }).exec(

			function( err, categories ) 
			{
				if( err ) 
				{
			    	res.status(500).json( err );
			  	} 
			  	else 
			  	{
			    	res.status(200).json( categories );
			  	}
			});
		}
		else
		{
			res.status(200).json({ name: '' , active: true });
		}
	}

	/*
	 * update or insert record
	 */
	controller.store = function( req , res )
	{
		if( !req.body._id )
		{
			Category.create( req.body , 

				function( err , category ) 
				{
			    	if(err) 
			    	{
			    		res.status(500).json( err );
			    	} 
			    	else 
			    	{
			      		res.status(200).json( category );
			    	}
			  	});
		}
		else
		{
			Category.findOneAndUpdate(
			{ _id: req.body._id },
			{ $set: req.body    }, 
			{ new: true      }, 
				function( err , category ) 
				{
			    	if ( err ) 
			    	{
			      		res.status(500).json( err );
			    	} 
			    	else 
			    	{
			      		res.status( 200 ).json( category );
			    	}
			  });
		}
	}

	/*
	 * delete record by _id
	 */
	controller.delete = function( req , res) 
	{ 
		var _id = sanitize(req.params.id);
		Category.findOneAndRemove(
			
			{ _id: _id }, 

			function( err , category ) 
			{
		    	if( err ) 
		    	{
		      		res.status(500).json( err );
		    	}
		    	else 
		    	{
		      		res.status(200).json(category);
				}
		  	});	
	}

	return controller;
}