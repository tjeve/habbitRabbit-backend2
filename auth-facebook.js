module.exports = function (app, passport) {
    // ========== Facebook OAuth ==========
  
    const FacebookStrategy = require('passport-facebook').Strategy
    passport.use(
      new FacebookStrategy(
        {
          clientID: 1057834684614934,
          clientSecret: 'c3d0b200ffb75ff3540835a6bcb46066',
          callbackURL: 'http://localhost:3000/auth/facebook/callback' // <-- Insert deployed address here (It didn't initally work because you left out the http, once you did that the warning from facebook went away)
        },
        function (accessToken, refereshToken, profile, cb) {
          console.log('auth-facebook line 13', profile.id, profile.displayName, profile)
          console.log(profile)
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
      passport.authenticate('facebook', { 
        successRedirect: '/',
        failureRedirect: '/auth/facebook' }),
      function (req, res) {
        console.log('successful authentication: line 42 of auth-facebook', res)
        // Successful authentication, redirect home.
        res.redirect('/')
      }
    )
    // ================= END ======================
  }
  