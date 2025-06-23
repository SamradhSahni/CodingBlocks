const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  activity: String,
  priority: Number
})

module.exports = mongoose.model('Todo', todoSchema)
