var passport = require( 'passport' );

module.exports = function( app )
{
	app.get('/auth/github'   , passport.authenticate('github') );
	app.get('/auth/facebook' , passport.authenticate('facebook',{ scope: [ 'email' ] }) );
	app.get('/auth/google'   , passport.authenticate('google', { scope: ['profile' , 'email'] }));
	
	app.get('/auth/github/callback' , 
		passport.authenticate('github',{
			successRedirect: '/'
	}));
	app.get('/auth/facebook/callback' , 
		passport.authenticate('facebook',{
		    successRedirect: '/'
	}));
	app.get('/auth/google/callback' , 
		passport.authenticate('google',{
		    successRedirect: '/'
	}));
	app.post('/login',
  		passport.authenticate('local', {
		    successRedirect: '/',
		    faliureRedirect: '/#/auth/login'
  	}));
	app.get( '/auth/logout' , function ( req , res ) {
		req.logOut();
		res.redirect('/'); 
	});	
}