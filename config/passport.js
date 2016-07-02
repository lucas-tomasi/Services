var passport       = require( 'passport' );
var GitHubStrategy = require( 'passport-github' ).Strategy;
var mongoose       = require( 'mongoose' );

module.exports = function () {
	
	var User = mongoose.model('User');

	passport.use( new GitHubStrategy( {

	    clientID:     "d9972146b75d63128c4a",
	    clientSecret: "63d8e86e0690d826fc218784987bb81fab2f2b20",
	    callbackURL:  "http://localhost:8000/auth/github/callback"

	},

	function(accessToken, refreshToken, profile, done) {
	    
	    User.findOrCreate({ 
	    	"login":  profile.username,
	    	"email":  profile.emails[0].value, 
	    	"name":   profile.displayName,
	    	"url":    profile.profileUrl,
	    	"provider": profile.provider
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