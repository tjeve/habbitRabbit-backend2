const dbconfigs = require("./knexfile.js")
const db = require('knex')(dbconfigs.development)

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
          return createUser(profile)
            .then(function (result) {
              cb(null, result)
            })
        }
        
      )
    )
  
    function createUser(user) {
      let addUserQuery = 'INSERT INTO "Users" ("id", "name", "slug") Values (?, ?, ?)'
      let searchUserQuery = 'SELECT * FROM "Users" WHERE "Users"."id" = ?'
     
        return db
          .raw(searchUserQuery, [user.id])
          .then(function (result) {
            if (result.rows.length === 0) {
              return db.raw(addUserQuery, [user.id, user.displayName, createSlug(user.displayName)] )
            }
          })
          .then(function() {
            return db.raw(searchUserQuery, [user.id] )
          })
          .then(function(result) {
            return result.rows[0]
          })


  }
  
  const createSlug = (name) => {
    return name.replace(/\s/g, '-').replace(/'/g, '').toLowerCase()
  }

    passport.serializeUser(function (user, cb) {
      console.log("passport.serializeUser --> ", user )
      cb(null, user)
    })
  
    passport.deserializeUser(function (obj, cb) {
      console.log("passport.deserializeUser -->", obj )
      cb(null, obj)
    })
  
    // app.use(passport.initialize())
    // app.use(passport.session())
  
    // ============= END ===============
  
    // ========== Passport-facebook routes ==========
    
// =============== Facebook Routes ===================
app.get('/auth/facebook', passport.authenticate('facebook'))
  
app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { 
        successRedirect: 'exp://127.0.0.1:19000',
        failureRedirect: '/auth/facebook' 
    }),
    function (req, res) {
    console.log(res.body, "Res BODY")
    console.log(req.user)
    // Successful authentication, redirect home.
    res.redirect('/')
    }
)
    // ================= END ======================
  }
  