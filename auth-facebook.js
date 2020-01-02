module.exports = function (app, passport) {
    // ========== Facebook OAuth ==========
  
    const FacebookStrategy = require('passport-facebook').Strategy
    passport.use(
      new FacebookStrategy(
        {
          clientID: 1057834684614934,
          clientSecret: 'c3d0b200ffb75ff3540835a6bcb46066',
          callbackURL: 'localhost:3000/auth/facebook/callback' // <-- Insert deployed address here
        },
        function (accessToken, refereshToken, profile, cb) {
          return cb(null, profile)
        }
  
      )
    )
  
    passport.serializeUser(function (user, cb) {
      cb(null, user)
    })
  
    passport.deserializeUser(function (obj, cb) {
      cb(null, obj)
    })
  
    // app.use(passport.initialize())
    // app.use(passport.session())
  
    // ============= END ===============
  
    // ========== Passport-facebook routes ==========
    app.get('/auth/facebook', passport.authenticate('facebook'))
  
    app.get(
      '/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/auth' }),
      function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/')
      }
    )
    // ================= END ======================
  }
  