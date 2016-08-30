var MyController = require( '../utils/MyController.js' );

module.exports = function ( app ) 
{
	var Reserve = app.models.Reserve;

	var ReserveController = new MyController( Reserve , { active: true } );

	ReserveController.getReserveByService = function ( req, res ) 
	{
		
	}

	ReserveController.getReserveByUser = function ( req, res ) 
	{
		
	}

	return ReserveController;
};