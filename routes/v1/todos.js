const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getAllTodosFromATodoList,
  getAllDefaultTodos,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../../controllers/todos');
const { protect } = require('../../middleware/auth');

router.route('/all').get(protect, getAllTodos);
router.route('/default').get(protect, getAllDefaultTodos);
router
  .route('/:todolistId')
  .get(protect, getAllTodosFromATodoList)
  .post(protect, addTodo);
router
  .route('/:id')
  .get(getTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

module.exports = router;
