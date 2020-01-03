const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const environment = process.env.NODE_ENV || 'development'
// For database
const dbconfigs = require("./knexfile.js")
const db = require('knex')(dbconfigs.development)
const query = require("./queries.js")

// ********************** SQL Queries **********************
let makeJSON = (data) => {
    return '<pre>' + JSON.stringify(data) + '</pre>'
}

function createHabit (userID, newHabit) {
    return db.raw(
        'INSERT INTO "Habits" ("user_id", "habit") Values (?, ?)',
        [userID, newHabit]
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

const getUserHabitsQuery =
    `SELECT "Users"."id", "Users"."name","Users"."slug","Habits"."habit"
    FROM "Users" 
    JOIN "Habits" 
    On "Users"."id" = "Habits"."user_id" 
    order by "Users"."id"`
const getUserHabits = db
                .raw(getUserHabitsQuery)
                .then(function(habits) {
                    console.log(habits)
                    return habits.rows
                })

// const getUserHabits = db('Habits')
//                 .where({user_id: 7}) // <-- Will find all habits from User 7
//                 .then(function(habits) {
//                     console.log(habits)
//                     return habits
//                 })

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
app.get('/user-habits', (req, res) => res.send(
    getUserHabits
))

//--> Adds a habit from a User to their list of Habits
app.post('/add-new-habbit', (req, res) => req.send(
    console.log(req.body)
    // createHabit()
))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
