var sanitize = require( 'mongo-sanitize' );

module.exports = function ( model , defaultModel ) {
	
	var MyController = {}
	  , Model        = model
	  , defaultModel = defaultModel;
		 
	/*
	 *	returns all records
	 */
	MyController.list = function( req, res ) {
		Model.find( {} ).exec(

		function( err , items ) {
	    	if( err ) {
	        	res.status(500).json( err );
	      	} else {
				res.status(200).json( items );
	      	}
	    });
	};


	/*
	 * returns record by _id
	 */
	MyController.get = function( req , res ) {
		var _id = sanitize(req.params.id);

		if( req.params.id !== 'undefined'  ) {
			
			Model.findOne( { _id: _id } ).exec(

			function( err, item ) {
				if( err ) {
			    	res.status(500).json( err );
			  	} else {
			    	res.status(200).json( item );
			  	}
			});
		} else   {
			res.status(200).json( defaultModel );
		}
	}
		
	/*
	 * update or insert record
	 */
	MyController.store = function( req , res ) {
		if( !req.body._id )	{
			Model.create( req.body , 

			function( err , item ) {
		    	if(err) {
		    		res.status(500).json( err );
		    	} else {
		    		
		      		res.status(200).json( item );
		    	}
		  	});

		} else {
			
			Model.findOneAndUpdate( { _id: req.body._id }, { $set: req.body }, { new: true }, 
				
			function( err , item ) {
		    	if ( err ) {
		      		res.status(500).json( err );
		    	} else {
		      		res.status( 200 ).json( item );
		    	}
		  	});
		}
	}

	/*
	 * delete record by _id
	 */
	MyController.delete = function( req , res) 
	{ 
		var _id = sanitize(req.params.id);

		Model.findOneAndRemove( { _id: _id }, 

		function( err , item ) {
	    	if( err ) {
	      		res.status(500).json( err );
	    	} else {
	      		res.status(200).json(item);
			}
	  	});	
	}

	return MyController;
}