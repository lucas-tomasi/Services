var bcrypt           = require('bcrypt');
var passport         = require( 'passport' );
var GitHubStrategy   = require( 'passport-github' ).Strategy;
var FacebookStrategy = require( 'passport-facebook' ).Strategy;
var GoogleStrategy   = require('passport-google-oauth20').Strategy;
var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require( 'mongoose' );

module.exports = function (app) {
	
	var User = mongoose.model('User');

	passport.use( new GitHubStrategy( {
	    clientID:     "d9972146b75d63128c4a",
	    clientSecret: "63d8e86e0690d826fc218784987bb81fab2f2b20",
	    callbackURL:  "http://localhost:8000/auth/github/callback"
	},
	function(accessToken, refreshToken, profile, done) {
	    User.findOrCreate({ 
	    	"login":  profile.username, 
	    	"name":   profile.displayName,
	    	"email":  profile.emails[0].value,
	    	"url":    profile.profileUrl,
	    	"provider": profile.provider
	    }, function ( err , user ) {
			return done(err, user);
	    });
	}));

	passport.use(new GoogleStrategy({
	    clientID: '828739488346-q5tcdqlm3tln98for2piakdvptahsji9.apps.googleusercontent.com',
	    clientSecret: 'O3aWGGKF3TSc8M4cnktmzvik',
	    callbackURL: "http://localhost:8000/auth/google/callback"
	  },
	  function(accessToken, refreshToken, profile, cb) {	    
	    User.findOrCreate({ 
	    	"login":  profile.id, 
	    	"name":   profile.displayName,
	    	"email": profile.emails[0].value,
	    	"url":    profile._json.url,
	    	"provider": profile.provider
	    }, function (err, user) {
	      return cb(err, user);
	    });
	}));

	passport.use( new FacebookStrategy({
		clientID: "1762091577382931",
		clientSecret: "7e33489430de69aa1cb1fdc77ffd7416",
		callbackURL: "http://localhost:8000/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'email']
	} ,
	function(accessToken, refreshToken, profile, cb) { 
	    User.findOrCreate({ 
	    	"login":  profile.id, 
	    	"name":   profile.displayName,
	    	"email": profile.emails[0].value,
	    	"url":    profile._json.url,
	    	"provider": profile.provider
	    }, function (err, user) {
	      return cb(err, user);
	    });
	}));

	 passport.use(new LocalStrategy(
	 	function(username, password, done) {
          User.findOne({ 
          	login: username, 
          	active: true,
          	professional: true 
          }, function ( err, user) {

          		if( user )
          		{
	          		if( bcrypt.compareSync( password , user.password ) )
	          		{
	           			return done( null , user );
	          		}
	          		else
	          		{
	          			return done( err );
	          		}
	          	}
	          	return done( err );
          		
        });
    }));

	
	passport.serializeUser(function ( user , done ) {
		done( null , user._id );
	});

	passport.deserializeUser(function ( id , done ) {	
		User.findById( id ,
			function( err, user ) {
				done( null , user );
		});
	});
}