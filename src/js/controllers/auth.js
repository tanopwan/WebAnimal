import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

import {User} from './database';

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

	    var user = {
	        'email': profile.emails[0].value,
	        'name' : profile.name.givenName + ' ' + profile.name.familyName,
	        'id'   : profile.id,
	        'token': accessToken
	    }

	    console.log("auth.js - Request accessToken map to id: " + profile.id + ", Finding... in DB");

	    User.findOne({fbId: profile.id}, function(err, result) {
	    	if (err) {
	    		console.log("auth.js - Find User in DB error: " + JSON.stringify(err));
	    		return done(err, null);
	    	}

	    	if (result) {
	    		console.log("auth.js - Found User in DB: " + JSON.stringify(result));
	    		return done(null, user);	
	    	}
			
			console.log("auth.js - User not found in DB");
			// User not found
			return done(null, null);
		});
	}
));

module.exports = passport;