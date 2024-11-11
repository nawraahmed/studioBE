const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const User = require("../models/User")
require("dotenv").config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },

    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            role: "user",
          })
        }
        return cb(null, user)
      } catch (error) {
        return cb(error, false)
      }
    }
  )
)

// Add to bottom of config/passport.js
passport.serializeUser(function (user, cb) {
  cb(null, user._id)
})

// Add to bottom of config/passport.js
passport.deserializeUser(async function (userId, cb) {
  // It's nice to be able to use await in-line!
  cb(null, await User.findById(userId))
})

module.exports = passport
