// Strategies: local, google, (others like facebook can be added later)

const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // For demo only: use bcrypt in production!
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// =====================
// Google OAuth Strategy
// =====================
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRETKEY,
    callbackURL: "http://localhost:4444/login/auth/google/callback"
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) return cb(null, user);

      // Create new user if doesn't exist
      user = await User.create({
        googleId: profile.id,
        googleAccessToken: accessToken,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        isAdmin:false
      });

      return cb(null, user);
    } catch (err) {
      return cb(err, false);
    }
  }
));

// =====================
// Serialize / Deserialize
// =====================
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // ✅ modern async syntax
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
