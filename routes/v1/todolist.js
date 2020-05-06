const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const {
  addTodoList,
  deleteTodoList,
  renameTodoList,
  getAllTodoLists,
} = require('../../controllers/todolist');

router.route('/').get(protect, getAllTodoLists);

router.route('/:name').post(protect, addTodoList);

router.route('/:id').delete(protect, deleteTodoList);

router.route('/:id/:name').put(protect, renameTodoList);

module.exports = router;
