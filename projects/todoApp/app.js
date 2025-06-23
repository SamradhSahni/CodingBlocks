const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const todoRoutes = require('./routes/todoRoutes')

const app = express()

const mongoURI = 'mongodb://127.0.0.1:27017/todoApp'
const port = 3000

mongoose.connect(mongoURI)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', todoRoutes)

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`)
})
