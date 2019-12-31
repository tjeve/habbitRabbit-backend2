const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const environment = process.env.NODE_ENV || 'development'

app.get('/', (req, res) => res.send(
    'Hello World!'
    ))

app.post('/users', (req, res) => res.send(
    
))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))