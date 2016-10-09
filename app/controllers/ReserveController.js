var MyController = require( '../utils/MyController.js' );
var MyMail       = require( '../utils/MyMail.js'       );
var async        = require('async');
var Util         = require( '../utils/MyUtil.js' );

module.exports = function ( app ) 
{
	var Reserve = app.models.Reserve;
	var ReserveController = new MyController( Reserve , { active: true } );

	var sendEmailReserve = function( reserve )
	{
		var mail = new MyMail();
		var content = "New <b>"+reserve.servicename+"</b><br><br><table><tr><td><b>Code:   </b></td><td>"+reserve._id+"</td></tr>"+
					  	"<tr><td><b>User:   </b></td><td>"+reserve.username+"</td></tr><tr><td><b>E-mail: </b></td><td>"+reserve.emailuser+"</td></tr>"+
					  	"<tr><td><b>Start:  </b></td><td>"+reserve.dt_start+"</td></tr><tr><td><b>End:    </b></td><td>"+reserve.dt_end+"</td></tr></table><br>"+reserve.details;
		mail.setSubject( 'New reserve' );
		mail.setTo( reserve.professionalname , reserve.emailprofessional );
		mail.setHtml( content );
		mail.send();
	};

	var sendEmailAnalyze = function( reserve )
	{
		var state = '';

		if( reserve.status == 'E' ) {
			state = '<font color="#31708f">Accpted</font>';
		} else if ( reserve.status == 'C' ) {
			state = '<font color="#a94442">Rejected</font>';
		} else if ( reserve.status == 'X' ) {
			state = '<font color="#3c763d">Completed</font>';
		}

		var content = "Your reservation for <b>" + reserve.ref_service.title + "</b> on the "+ reserve.dt_start +" to "+ reserve.dt_end +" was "+  state +"<br><br>Details:<br>"+ reserve.response;
		var mail    = new MyMail();

		mail.setSubject( 'Reserve:' + reserve.ref_service.title );
		mail.setTo( reserve.ref_user.name , reserve.ref_user.email );
		mail.setHtml( content );

		mail.send();
	};

	ReserveController.store = function( req , res )
	{
		if( !req.body._id )	{
			Reserve.create( req.body ,function( err , item ) {
		    	if(err) {
		    		res.status(500).json( err );
		    	} else {
		    		req.body._id = item._id;
		    		sendEmailReserve( req.body );
		      		res.status(200).json( item );
		    	}
		  	});
		} else {
			Reserve.findOneAndUpdate( { _id: req.body._id }, { $set: req.body }, { new: true }, function( err , item ) {
		    	if ( err ) {
		      		res.status(500).json( err );
		    	} else {
					sendEmailAnalyze( req.body );
		      		res.status( 200 ).json( item );
		    	}
		  	});
		}
	};



	ReserveController.getReserveByService = function ( req, res ) 
	{
		Reserve.find( { ref_service : req.params.id } )
			.exec(
				function ( err, items ) {
					if( err ) {
						res.status( 500 ).json( err );
					} else {
						res.status( 200 ).json( items );
					}
		});
	};

	ReserveController.getReserveByUser = function ( req, res ) 
	{
		Reserve.find( {} )
			.populate('ref_user')
			.populate('ref_service')
			.populate({ path: 'ref_service', populate: { path: 'professional' , model: 'User' } })
			.sort({start: -1})
			.exec( function ( err, items ) {
				if( err ) {
					res.status( 500 ).json( err );
				} else {
					var newItens  = items.filter( function( reserve ){
						if( reserve.ref_user && reserve.ref_user.email == req.params.id ){
							return reserve;
						}
					});
					res.status( 200 ).json( newItens );
				}
		});	
	};

	ReserveController.getReserveByProfessional = function ( req, res ) 
	{
		Reserve.find( {} )
			.populate('ref_user')
			.populate({ path: 'ref_user', populate: { path: 'address.city' , model: 'City' } })
			.populate('ref_service')
			.populate({ path: 'ref_service', populate: { path: 'professional' , model: 'User' } })
			.populate({ path: 'ref_service', populate: { path: 'ref_category' , model: 'Category' } })
			.sort({start: -1})
			.exec( function ( err, items ) {
				if( err ) {
					res.status( 500 ).json( err );
				} else {
					var newItens  = items.filter( function( reserve ){
						if( reserve.ref_service.professional._id == req.params.id ){
							return reserve;
						}
					});
					res.status( 200 ).json( newItens );
				}
		});	
	};

	ReserveController.getReserationsServicesDrilldown = function( req, res )
	{
		Reserve.aggregate().group( { _id:'$ref_service', count: { $sum: 1 } } ).exec( function( err, items ){
			
			Reserve.populate( items, { path: "_id", model: "Service" } , function( err, items ) {

				var results = items.map( function( item ){
				
					if( !item._id ) return false;
				
					return { id: item._id.ref_category, color:'#459c50',name: item._id.title, y: item.count, drilldown: item._id._id };
				
				}).filter( function( item ) { 
					return item !== false; 
				});

				res.status( 200 ).json( results );
			});
		});
	};

	ReserveController.getStatusReservationsDrilldown = function( req, res )
	{
		var states = Util.getStatesReservations();

		async.series( [ function( callback ){

			Reserve.aggregate().group( { _id: { status: '$status' , ref_service: '$ref_service' },  count: { $sum: 1 } } ).exec( function( err, items ){
				
				var results = items.map( function( item ){
				
					if( !item._id ) return false;

					return { id: item._id.ref_service , color:states[item._id.status].color ,name: states[item._id.status].name, y: item.count };
				
				}).filter( function( item ) { 

					return item !== false; 
				});
				
				callback( null, results );					
			});

		}] , function( err , results ){
			if( err ) res.status(500).json(err);		
			res.status( 200 ).json( results[0] );

		});
	};	

	ReserveController.getReservationsReportUser = function( req, res )
	{
		var states = Util.getStatesReservations()
		  , filter = req.body;
		
		async.series( [ function( callback ){
			
			Reserve.aggregate().group( { _id: { status: '$status' , ref_user: '$ref_user' },  count: { $sum: 1 } } ).exec( function( err, items ){
				
				Reserve.populate( items, { path: "_id.ref_user", model: "User", populate: { path:  "address.city", model: 'City' } } , function( err, items ) {


					var results = items.map( function( item ){


						if( !item._id.ref_user ) return false;

						return {
							name : item._id.ref_user.name,
							active : item._id.ref_user.active,
							email : item._id.ref_user.email,
							phone : item._id.ref_user.phone,
							type : item._id.ref_user.type,
							provider : item._id.ref_user.provider,
							ref_city: item._id.ref_user.address.city._id,
							city: item._id.ref_user.address.city.city,
							state: item._id.ref_user.address.city.state,
							status : states[item._id.status].name,
							ref_status : item._id.status,
							reservations : item.count
						};
					
					}).filter( function( item ) {
						
						if( !item ) return false; 
						
						var nameRegExp = new RegExp( filter.name,"ig");
						
						if( !nameRegExp.test(item.name) ) {
							return false;
						}
						if( filter.provider && filter.provider != item.provider ) {
							return false;
						}
						if( filter.type && filter.type != item.type ) {
							return false;
						}
						if( filter.city && filter.city != item.ref_city ) {
							return false;
						}
						if( filter.active && Boolean(parseInt(filter.active)) != Boolean(item.active) ){
							console.log( 'das');
							return false;
						}
						return true; 
					});
					
					callback( null, results );					
				});
				
			});

		}] , function( err, results ){
			if( err ) res.status(500).json(err);
			res.status(200).json( results[0] );
		});
	};

	return ReserveController;
};