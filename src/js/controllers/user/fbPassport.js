import passport from './passport.js'
import FacebookTokenStrategy from 'passport-facebook-token';

class FBPassport {

    create(clientId, clientSecret) {
        passport.use('facebook-token-login', new FacebookTokenStrategy({
        		clientID        : clientId,
        		clientSecret    : clientSecret
        	}, function(accessToken, refreshToken, profile, done) {

        	    var user = {
        	        'email': profile.emails[0].value,
        	        'name' : profile.name.givenName + ' ' + profile.name.familyName,
        	        'id'   : profile.id,
        	        'token': accessToken
        	    }

        	    return done(null, user);
        	}
        ));
        return passport;
    }
}

module.exports = new FBPassport();
