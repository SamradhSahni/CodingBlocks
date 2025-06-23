const Todo = require('../models/todo')

async function getTodos(req, res) {
  const todos = await Todo.find().sort({ priority: -1 })
  res.sendFile('index.html', { root: 'views' })
}

async function fetchTodos(req, res) {
  const todos = await Todo.find().sort({ priority: -1 })
  res.json(todos)
}

async function addTodo(req, res) {
  const count = await Todo.countDocuments()
  const newTodo = new Todo({ activity: req.body.activity, priority: count + 1 })
  await newTodo.save()
  res.redirect('/')
}

async function deleteTodo(req, res) {
  const id = req.params.id
  await Todo.findByIdAndDelete(id)
  res.redirect('/')
}

async function moveUp(req, res) {
  const id = req.params.id
  const todo = await Todo.findById(id)
  const higher = await Todo.findOne({ priority: { $gt: todo.priority } }).sort({ priority: 1 })
  if (higher) {
    let temp = todo.priority
    todo.priority = higher.priority
    higher.priority = temp
    await todo.save()
    await higher.save()
  }
  res.redirect('/')
}

async function moveDown(req, res) {
  const id = req.params.id
  const todo = await Todo.findById(id)
  const lower = await Todo.findOne({ priority: { $lt: todo.priority } }).sort({ priority: -1 })
  if (lower) {
    let temp = todo.priority
    todo.priority = lower.priority
    lower.priority = temp
    await todo.save()
    await lower.save()
  }
  res.redirect('/')
}

module.exports = { getTodos, addTodo, deleteTodo, moveUp, moveDown, fetchTodos }
