var passport = require( 'passport' );

module.exports = function( app )
{
	app.get('/auth/github'   , passport.authenticate('github') );
	app.get('/auth/facebook' , passport.authenticate('facebook',{ scope: [ 'email' ] }) );
	app.get('/auth/google'   , passport.authenticate('google', { scope: ['profile' , 'email'] }));
	
	app.get('/auth/github/callback' , 
		passport.authenticate('github',{
			successRedirect: '/#/login'
	}));
	app.get('/auth/facebook/callback' , 
		passport.authenticate('facebook',{
		    successRedirect: '/#/login'
	}));
	app.get('/auth/google/callback' , 
		passport.authenticate('google',{
		    successRedirect: '/#/login'
	}));
	app.post('/login',
  		passport.authenticate('local', {
		    successRedirect: '/#/login',
		    faliureRedirect: '/#/auth/login'
  	}));
	app.get( '/auth/logout' , function ( req , res ) {
		req.logOut();
		res.redirect('/#/logout'); 
	});	
}