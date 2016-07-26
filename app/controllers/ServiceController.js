module.exports = function ( app ) 
{
	var MyController = require( '../utils/MyController.js' );
	
	var Service = app.models.Service;

	var ServiceController = new MyController( Service , { dt_start: Date.now(), active: true } );

	return ServiceController;
};