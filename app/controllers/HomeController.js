module.exports = function()
{
	var controller = {};

	controller.index = function( req, res )
	{
		var _username = 'Login';
		var _link     = '#/auth/';
		var _menu     = false;

		if( req.user )
		{
			_username = req.user.name;
			_link     = '/auth/logout/';
			_menu     = true;
		}
		
		res.render( 'index', { 
			username: _username,
			link: _link,
			menu: _menu
		});
	};

	return controller;
}