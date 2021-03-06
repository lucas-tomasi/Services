var MyController = require( '../utils/MyController.js' );
var sanitize     = require( 'mongo-sanitize' );
var bcrypt       = require('bcrypt');
module.exports = function ( app ) 
{
	var User = app.models.User;
	var defaultModel = { active: true };
	var UserController = new MyController( User , defaultModel );

	UserController.getUserLogged = function ( req , res ) {
		res.status(200).json(req.user);
	}

	UserController.saveAddress = function( req, res )
	{	
		var objUpdate = { phone: req.body.phone, address: req.body.address }
		
		if( req.body.image && req.body.image[0] ) {
			objUpdate.image = req.body.image[0].bas64;
		}
		
		User.update( { email: req.body.email }, { $set: objUpdate }, { multi: true }, 
			
		function( err , item ) {
	    	if ( err ) {
	      		res.status(500).json( err );
	    	} else {
	      		res.status( 200 ).json( {} );
	    	}
	  	});
	}

	UserController.getProfessionalsComposite = function( req, res )
	{
		User.find( { type: 2 } ).exec(
			
			function( err , professional ) 
			{
		    	if( err ) 
		    	{
		        	res.status(500).json( err );
		      	} 
		      	else 
		      	{
		      		var composite = [];
		      		for( i in professional )
		      		{
		      			composite.push( { id: professional[i]._id , text: professional[i].name } );
		      		}
					res.status(200).json( composite );
		      	}
		    });
	};

	UserController.store = function ( req, res ) {
		if( !req.body._id )	{

			req.body.password = bcrypt.hashSync(req.body.password,10);

			User.create( req.body , 

			function( err , item ) {
		    	if(err) {
		    		res.status(500).json( err );
		    	} else {
		      		item.password = '';
		      		res.status(200).json( item );
		    	}
		  	});

		} else {
			
			if( req.body.password )
			{
				req.body.password = bcrypt.hashSync(req.body.password,10);
			}
			else
			{
				delete req.body.password;
			}

			User.findOneAndUpdate( { _id: req.body._id }, { $set: req.body }, { new: true }, 
				
			function( err , item ) {
		    	if ( err ) {
		      		res.status(500).json( err );
		    	} else {
		    		item.password = '';
		      		res.status( 200 ).json( item );
		    	}
		  	});
		}
	};

	UserController.get = function( req , res ) {
	
		var _id = sanitize(req.params.id);

		if( req.params.id !== 'undefined'  ) {
			
			User.findOne( { _id: _id } ).exec(

			function( err, item ) {
				if( err ) {
			    	res.status(500).json( err );
			  	} else {
			  		item.password = '';
			    	res.status(200).json( item );
			  	}
			});
		} else   {
			res.status(200).json( defaultModel );
		}
	};

	UserController.genereteReport = function ( req, res ) {		
		
		res.status(200).json( { status: 'success' } );

	};
	
	return UserController;
};