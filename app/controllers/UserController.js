var sanitize = require( 'mongo-sanitize' );

module.exports = function ( app ) 
{

	var User = app.models.User;

	var controller = {};
	
	/*
	 *	returns all records
	 */
	controller.list = function( req, res )
	{
		User.find( {} ).exec(
			
			function( err , users ) 
			{
		    	if( err ) 
		    	{
		        	res.status(500).json( err );
		      	} 
		      	else 
		      	{
					res.status(200).json( users );
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
			User.findOne(
			
			{ _id: _id }).exec(

			function( err, user ) 
			{
				if( err ) 
				{
			    	res.status(500).json( err );
			  	} 
			  	else 
			  	{
			    	res.status(200).json( user );
			  	}
			});
		}
		else
		{
			res.status(200).json( new User() );
		}
	}

	/*
	 * update or insert record
	 */
	controller.store = function( req , res )
	{
		if( !req.body._id )
		{
			User.create( req.body , 

				function( err , user ) 
				{
			    	if(err) 
			    	{
			    		res.status(500).json( err );
			    	} 
			    	else 
			    	{
			      		res.status(200).json( user );
			    	}
			  	});
		}
		else
		{
			User.findOneAndUpdate(
			{ _id: req.body._id },
			{ $set: req.body    }, 
			{ new: true      }, 
				function( err , user ) 
				{
			    	if ( err ) 
			    	{
			      		res.status(500).json( err );
			    	} 
			    	else 
			    	{
			      		res.status( 200 ).json( user );
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
		User.findOneAndRemove(
			
			{ _id: _id }, 

			function( err , user ) 
			{
		    	if( err ) 
		    	{
		      		res.status(500).json( err );
		    	}
		    	else 
		    	{
		      		res.status(200).json(user);
				}
		  	});	
	}

	return controller;
}