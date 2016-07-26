var MyController = require( '../utils/MyController.js' );

module.exports = function ( app ) 
{
	var User = app.models.User;

	var UserController = new MyController( User , { active: true } );

	UserController.getProfessionalsComposite = function( req, res )
	{
		User.find( { professional: true } ).exec(
			
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
	
	return UserController;
};