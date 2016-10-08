var sanitize = require( 'mongo-sanitize' );
module.exports = function ( app ) 
{
	var MyController = require( '../utils/MyController.js' );
	
	var Service = app.models.Service;

	var defaultModel = { dt_start: Date.now(), active: true, dt_end: '' };

	var ServiceController = new MyController( Service , defaultModel );

	ServiceController.saveComment = function ( req, res ) {
		var _id      = sanitize(req.body.service);
		var comment = req.body;
		delete comment.service;	
		Service.findOne( { _id: _id } )
			.exec(
			function( err, item ) {
				
			    item.comments.push( comment );

			    item.save( function ( err ){
			    	if( err ){
			    		res.status(500).json( err );
			    	} else {
			    		res.status(200).json( item );
			    	}
			    });
		});
	}

	ServiceController.list = function( req, res ) {
		var filter = ( req.user.type == 2 )? { professional : req.user._id } : {};
		Service.find( filter ).exec( function( err , items ) {
	    	if( err ) {
	        	res.status(500).json( err );
	      	} else {
				res.status(200).json( items );
	      	}
	    });
	};

	ServiceController.getServicesHome = function ( req, res ) {
		Service.find( { active: true , $or: [ { dt_end:{ $eq : null } } , {dt_end: { $lte: new Date().toISOString() } } ] } )
			.populate( 'professional' )
			.populate( 'ref_category' )
			.exec(
		function( err, items ) {
			if( err ) {
		    	res.status(500).json( err );
		  	} else {
		  		var newItems = items.map( function( item ){
				    item.price = parseFloat(item.price.value).toFixed(2);
				    return item;
		    	});
			    res.status(200).json( newItems );
		  	}
		});
	};

	ServiceController.get = function( req , res ) {
		var _id = sanitize(req.params.id);
		
		if( req.params.id !== 'undefined'  ) {
			
			Service.findOne( { _id: _id } )
			.populate( 'professional' )
			.populate( 'ref_category' )
			.exec(

			function( err, item ) {
				if( err ) {
			    	res.status(500).json( err );
			  	} else {
			  		item.price = parseFloat(item.price.value).toFixed(2); 
			    	res.status(200).json( item );
			  	}
			});
		} else   {
			res.status(200).json( defaultModel );
		}
	};

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
	};

	// count de services por categoria
	ServiceController.getServicesCategoriesDrilldown = function( req, res ) 
	{	
		Service.aggregate().group( { _id:'$ref_category', count: { $sum: 1 } } ).exec( function( err, items ){
			
			Service.populate( items, { path: "_id", model: "Category" } , function( err, items ) {

				var results = items.map( function( item ){
				
					if( !item._id ) return false;
				
					return { color:'#9dc7f1',name: item._id.name, y: item.count, drilldown: item._id._id };
				
				}).filter( function( item ) { 
					return item !== false; 
				});
				
				res.status( 200 ).json( results );
			});
		});
	};

	return ServiceController;
};