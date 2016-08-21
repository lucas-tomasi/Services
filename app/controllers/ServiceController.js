var sanitize = require( 'mongo-sanitize' );
module.exports = function ( app ) 
{
	var MyController = require( '../utils/MyController.js' );
	
	var Service = app.models.Service;

	var defaultModel = { dt_start: Date.now(), active: true, dt_end: '' };

	var ServiceController = new MyController( Service , defaultModel );

	ServiceController.getServicesHome = function ( req, res ) 
	{
		Service.find( { active: true , $or: [ { dt_end:{ $eq : null } } , {dt_end: { $lte: new Date().toISOString() } } ] } )
			.populate( 'professional' )
			.exec(
		function( err, itens ) {
			if( err ) {
		    	res.status(500).json( err );
		  	} else {
		    	res.status(200).json( itens );
		  	}
		});
	}

	ServiceController.get = function( req , res ) {
		var _id = sanitize(req.params.id);

		if( req.params.id !== 'undefined'  ) {
			
			Service.findOne( { _id: _id } )
			.populate( 'professional' )
			.exec(

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

	ServiceController.store = function( req , res ) {
		if( !req.body._id )	{
			Service.create( req.body , 

			function( err , item ) {
		    	if(err) {
		    		res.status(500).json( err );
		    	} else {
		    		item.professionalname = req.body.professionalname;
		      		res.status(200).json( item );
		    	}
		  	});

		} else {
			
			Service.findOneAndUpdate( { _id: req.body._id }, { $set: req.body }, { new: true }, 
				
			function( err , item ) {
		    	if ( err ) {
		      		res.status(500).json( err );
		    	} else {
		    		item.populate( 'professional' , function (err) {
		    			res.status( 200 ).json( item );
		    		});
		    	}
		  	});
		}
	}

	return ServiceController;
};