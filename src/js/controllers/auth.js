import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

//import {User} from './database';
import User from './userDBController.js'

var FACEBOOK_APP_ID = '1669516483298849';
var FACEBOOK_APP_SECRET = '2c979757d7bba3051bbdaa81f0b3073d';

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use('facebook-token', new FacebookTokenStrategy({
		clientID        : FACEBOOK_APP_ID,
		clientSecret    : FACEBOOK_APP_SECRET
	}, function(accessToken, refreshToken, profile, done) {

		console.log("auth.js - facebook-token");

	    var user = {
	        'email': profile.emails[0].value,
	        'name' : profile.name.givenName + ' ' + profile.name.familyName,
	        'id'   : profile.id,
	        'token': accessToken
	    }

	    console.log("auth.js - Request accessToken map to id: " + profile.id + ", Finding... in DB");

	    User.validateFBUserSession(profile.id).then( function(result) {
	    	console.log("auth.js - Found User in DB: " + JSON.stringify(result));
	    	return done(null, user);
	    }, function(error) {
	    	console.log("auth.js - Validate user session error: " + JSON.stringify(error));
	    	return done(err, null);
	    });
	}
));

passport.use('facebook-token-login', new FacebookTokenStrategy({
		clientID        : FACEBOOK_APP_ID,
		clientSecret    : FACEBOOK_APP_SECRET
	}, function(accessToken, refreshToken, profile, done) {

		//console.log("auth.js - facebook-token-login");
	    var user = {
	        'email': profile.emails[0].value,
	        'name' : profile.name.givenName + ' ' + profile.name.familyName,
	        'id'   : profile.id,
	        'token': accessToken
	    }

	    return done(null, user);
	}
));

module.exports = passport;
