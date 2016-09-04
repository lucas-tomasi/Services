
module.exports = function() 
{
	var auth = function ( req , res , next )
	{
		var isPublic    = /^\/public\//;    // QUALQUER COISA
		var isAdmin     = /^\/admin\//;     // CADASTROS GERAIS
		var isProtected = /^\/protected\//; // TEM QUE TAR LOGADO
		if( !isPublic.test( req.url ) )
		{
			if ( req.isAuthenticated() ) 
			{
				if( isAdmin.test( req.url ) && ( req.user.type == 3 || req.user.type == 2 )   )
				{
					return next();
				}
				else if ( isProtected.test( req.url ) )
				{
					return next();
				}
				else
				{
					return res.status('401');
				}
			} 
			else 
			{	 	
				return res.status('401');
			}
		}
		
		return next();
	}

	return { verify: auth };
}