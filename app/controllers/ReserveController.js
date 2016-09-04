var MyController = require( '../utils/MyController.js' );

module.exports = function ( app ) 
{
	var Reserve = app.models.Reserve;

	var ReserveController = new MyController( Reserve , { active: true } );

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
		Reserve.find( { ref_user : req.params.id } )
			.exec(
				function ( err, items ) {
					if( err ) {
						res.status( 500 ).json( err );
					} else {
						res.status( 200 ).json( items );
					}
		});	
	}

	return ReserveController;
};