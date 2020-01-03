const fs = require('fs')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const environment = process.env.NODE_ENV || 'development'
// ========== Database Setup ==========
const dbconfigs = require("./knexfile.js")
const db = require('knex')(dbconfigs.development)
const query = require("./queries.js")

// ========== Setup Passport ==========
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))





// ********************** SQL Queries **********************
let makeJSON = (data) => {
    return '<pre>' + JSON.stringify(data) + '</pre>'
}

// function createHabit (userID, newHabit) {
//     return db.raw(
//         'INSERT INTO "Habits" ("user_id", "habit") Values (?, ?)',
//         [userID, newHabit]
//     )
// }
function createHabit (user) {
    console.log("userID:", user.user_id)
    console.log("newHabit:", user.habit)
    return db.raw(
        'INSERT INTO "Habits" ("user_id", "habit") Values (?, ?)',
        [user.user_id, user.habit]
    )
}

const getUsers = db('Users')
                .then(function(users){
                    let getName = (user) => { return user.name}
                    // let names = users.map(getName)
                    // console.log(names)
                    return users
                })

const getHabits = db('Habits')
                .then(function(habits) {
                    // console.log(habits)
                    return habits
                })

// UNCOMMENT WHEN YOU FIGURE OUT HOW TO QUERY
const getUserHabitsQuery =
    `SELECT "Users"."id", "Users"."name","Users"."slug","Habits"."habit"
    FROM "Users" 
    JOIN "Habits" 
    On "Users"."id" = "Habits"."user_id"
    WHERE "Users"."id" = ?
    order by "Users"."id"`
const getUserHabits = (userId) => { //<-- Test in Postman: Choose Post, then click body, and enter an object with the correct keys and values, then press send
   return  db
            .raw(getUserHabitsQuery, [userId])
            .then(function(habits) {
                console.log(habits.rows)
                return habits.rows
            })

}

let addHabitQuery = db('Habits')
                .insert({
                    user_id: 'SEND USERID HERE',
                    habit: 'INSERT TYPED TEXT HERE'
                })
// ********************** Routes **********************
app.get('/', (req, res) => res.send(
    'Hello World!'
))
//--> Displays all Users
app.get('/users', (req, res) => res.send(
    makeJSON(getUsers)
))
//--> Displays a Users list of Habits
app.get('/habits', (req, res) => res.send(
    makeJSON(getHabits)
))
//--> Displays all the habits for one user
app.get('/user-habits/:userId', (req, res) => { // <-- You will eventually be able to remove the :userID once you get the Oauth working. 
    getUserHabits(req.params.userId) // <-- Once Oauth is running you can use the User object you get back from facebook to find the userid. Might look something like "req.params.userId", console log it first
        .then(function(result) {
            console.log(result, "Line 103 -- /user-habits/:userId")
            res.send(makeJSON(result))
        })
        .catch(function(error) {
            res.status(404).send("Page Not Found")
        })
    
    // getUserHabits
    })

//--> Adds a habit from a User to their list of Habits
app.post('/add-new-habit', (req, res) => {
    createHabit(req.body)
    .then(function(result) {
        res.send(result)
    })
    .catch(function(error) {
        console.warn("Something's Wrong!", error)
    })
})

app.post('/login', passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/login' 
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

require('./auth-facebook.js')(app, passport)