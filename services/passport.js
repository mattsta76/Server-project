const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// user id is from the mongo database
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },

    async (accessToken, refreshToken, profile, done) => {

    const existingUser = await User.findOne({ googleId: profile.id})
      if (existingUser) {

          // we all ready have a user that has this google profile id
          done(null, existingUser);
        } else {
          // we dont have a record with this user Id
          const user = await new User({ googleId:  profile.id }).save()
          done(null, user);
        }
    }
  )
);
