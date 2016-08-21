module.exports = function( app )
{
	var controller = {};

	controller.index = function( req, res )
	{
		
		if( req.user )
		{
			if(req.user.type == 1)
			{
				res.render( 'index', { 
					username: req.user.name,
					image:    req.user.image,
					logged:   req.user.type
				});
			}
			else
			{				
				res.render( 'index', { 
					username: req.user.name,
					image:    req.user.image,
					logged:   req.user.type
				});
			}
		}
		else
		{
			res.render( 'index', { logged: false } );
		}
	};

	return controller;
}