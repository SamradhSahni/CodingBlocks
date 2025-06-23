const express = require('express')
const router = express.Router()
const controller = require('../controllers/todoController')

router.get('/', controller.getTodos)
router.get('/todos', controller.fetchTodos)
router.post('/add', controller.addTodo)
router.post('/delete/:id', controller.deleteTodo)
router.post('/up/:id', controller.moveUp)
router.post('/down/:id', controller.moveDown)

module.exports = router
