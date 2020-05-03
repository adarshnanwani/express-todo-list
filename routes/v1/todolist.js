const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const {
  addTodoList,
  deleteTodoList,
  renameTodoList,
} = require('../../controllers/todolist');

router.route('/:name').post(protect, addTodoList);

router.route('/:id').delete(protect, deleteTodoList);

router.route('/:id/:name').delete(protect, renameTodoList);

module.exports = router;
