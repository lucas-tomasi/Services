var MyController = require( '../utils/MyController.js' );
var MyMail       = require( '../utils/MyMail.js'       );
module.exports = function ( app ) 
{
	var Reserve = app.models.Reserve;

	var ReserveController = new MyController( Reserve , { active: true } );

	var sendEmailReserve = function( reserve )
	{
		var mail = new MyMail();
		var content = "New <b>" + reserve.servicename + "</b><br>" +
					  "<br>"    +
					  "<table>" +
					  	"<tr>"  +
					  		"<td><b>Code:   </b></td><td>"+ reserve._id       +"</td>"+
					  	"</tr>"+
					  	"<tr>"  +
					  		"<td><b>User:   </b></td><td>"+ reserve.username  +"</td>"+
					  	"</tr>"+
					  	"<tr>"  +
					  		"<td><b>E-mail: </b></td><td>"+ reserve.emailuser +"</td>"+
					  	"</tr>"+
					  	"<tr>"  +
					  		"<td><b>Start:  </b></td><td>"+ reserve.dt_start  +"</td>"+
					  	"</tr>"+
					  	"<tr>"  +
					  		"<td><b>End:    </b></td><td>"+ reserve.dt_end    +"</td>"+
					  	"</tr>"+
					 "</table><br>"+
					 reserve.details;

		mail.setSubject( 'New reserve' );
		mail.setTo( reserve.professionalname , reserve.emailprofessional );
		mail.setHtml( content );
		mail.send();
	};

	ReserveController.store = function( req , res )
	{

		if( !req.body._id )	{
			Reserve.create( req.body , 

			function( err , item ) {
		    	if(err) {
		    		res.status(500).json( err );
		    	} else {
		    		req.body._id = item._id;
		    		sendEmailReserve( req.body );
		      		res.status(200).json( item );
		    	}
		  	});

		} else {
			
			Reserve.findOneAndUpdate( { _id: req.body._id }, { $set: req.body }, { new: true }, 
				
			function( err , item ) {
		    	if ( err ) {
		      		res.status(500).json( err );
		    	} else {
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
	}

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
						if( reserve.ref_user.email == req.params.id ){
							return reserve;
						}
					});
					res.status( 200 ).json( newItens );
				}
		});	
	}

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
	}

	return ReserveController;
};