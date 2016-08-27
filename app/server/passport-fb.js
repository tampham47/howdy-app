/**
 * gsun2016
 * tw
 */

import passport from 'passport';
import { Strategy } from 'passport-facebook';

// Configure the Facebook strategy for use by Passport.
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
  clientID: '1391679424181926',
  clientSecret: 'b5106f229d82bad60a493de18dc4473b',
  callbackURL: '/login/facebook/return',
  // scope: [ 'email', 'basic_info', 'user_photos'],
  profileFields: ['id', 'displayName', 'name', 'gender', 'photos', 'email', 'link']
},
function(accessToken, refreshToken, profile, cb) {
  // In this example, the user's Facebook profile is supplied as the user
  // record.  In a production-quality application, the Facebook profile should
  // be associated with a user record in the application's database, which
  // allows for account linking and authentication with other identity
  // providers.
  console.log(`>>PROFILE ${accessToken} : ${refreshToken} : ${profile}`);
  return cb(null, profile);
}));

// Configure Passport authenticated session persistence.
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var PassportFacebook = function(app) {
  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require('morgan')('combined'));
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());


  app.get('/login/facebook', passport.authenticate('facebook'));

  app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/api/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
      res.send(req.user);
    }
  );
};

export default PassportFacebook;
