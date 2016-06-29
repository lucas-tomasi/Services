var passport       = require( 'passport' );
var GitHubStrategy = require( 'passport-github' ).Strategy;
var mongoose       = require( 'mongoose' );

module.export = function () {
	
	var User = mongoose.model('User');

	passport.use( new GitHubStrategy( {

	    clientID:     GITHUB_CLIENT_ID,
	    clientSecret: GITHUB_CLIENT_SECRET,
	    callbackURL:  "http://localhost:8000/auth/github/callback"

	},

	function(accessToken, refreshToken, profile, done) {
	    User.findOrCreate({ 
	    	
	    	"login": profile.username,
	    	"nome":   profile.username 
	    
	    }, 
	    
	    function ( err , user ) {
	    
	      	return done(err, user);
	    
	    });

	}));

	passport.serializeUser(function ( user , done ) {
		done( null , user._id );
	});

	passport.deserializeUser(function ( id , done ) {	
		User.findById( id ,
			function( err, usuario ) {
				done( null , usuario );
		});
	});
}