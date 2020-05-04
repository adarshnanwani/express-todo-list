const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../../controllers/todos');
const { protect } = require('../../middleware/auth');

router.route('/').post(protect, addTodo).get(getAllTodos);

router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
