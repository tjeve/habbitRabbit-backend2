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
let prepJSON = (data) => {
    return '<pre>' + JSON.stringify(data) + '</pre>'
}

let allHabitsForAUser = `

`

let getUsers = db('Users')
                .then(function(users){
                    let getName = (user) => { return user.name}
                    let names = users.map(getName)
                    console.log(names)
                    return users
                })

let getHabits = db('Habits')
                .then(function(habits) {
                    // console.log(habits)
                    return habits
                })
let addHabitQuery = db(habit)
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
    '<pre>' + JSON.stringify(getUsers, null, 4) + '</pre>'
))
//--> Displays a Users list of Habits
app.get('/habits', (req, res) => res.send(
    '<pre>' + JSON.stringify(getHabits, null, 4) + '</pre>'
))

//--> Adds a habit from a User to their list of Habits
app.post('/add-new-habbit', (req, res) => req.send(
    addHabitQuery
))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
