const Todo = require('../models/Todo');
const TodoList = require('../models/TodoList');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Get all todos for a user
//@route GET /api/v1/todos/all
//@access public
exports.getAllTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({
    user: req.user.id,
  });
  res.status(200).json({ success: true, data: todos });
});

//@desc Get default todo list todos for a user
//@route GET /api/v1/todos/default
//@access public
exports.getAllDefaultTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({
    user: req.user.id,
    todolist: req.user.defaultList,
  });
  res.status(200).json({ success: true, data: todos });
});

//@desc Get all todos from a todo list for a user
//@route GET /api/v1/todos
//@access public
exports.getAllTodosFromATodoList = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({
    user: req.user.id,
    todolist: req.params.todolistId,
  });
  res.status(200).json({ success: true, data: todos });
});

//@desc Add a new todo
//@route POST /api/v1/todos/:todolistId
//@access private
exports.addTodo = asyncHandler(async (req, res, next) => {
  const { todolistId } = req.params;
  if (!todolistId) {
    req.body.todolist = req.user.defaultList;
  } else {
    const todoListData = await TodoList.findById(todolistId);
    if (!todoListData) {
      return next(
        new ErrorResponse(`No todo list find with the id ${todolistId}`, 400)
      );
    }
    if (todoListData.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`Unauthorized access`, 401));
    }
    req.body.todolist = todoListData.id;
  }

  req.body.user = req.user.id;

  const todo = await Todo.create(req.body);

  res.status(201).json({ success: true, data: todo });
});

//@desc Get a single todo
//@route GET /api/v1/todos/:id
//@access public
exports.getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return next(
      new ErrorResponse(`No todo item found with the id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: todo });
});

//@desc Update a single todo
//@route PUT /api/v1/todos/:id
//@access public
exports.updateTodo = asyncHandler(async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(
      new ErrorResponse(`No todo item found with the id ${req.params.id}`, 404)
    );
  }

  if (todo.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Unauthorized access`, 401));
  }

  const fieldsToUpdate = {
    text: typeof req.body.text !== 'undefined' ? req.body.text : todo.text,
    completed:
      typeof req.body.completed !== 'undefined'
        ? req.body.completed
        : todo.completed,
  };

  console.log(req.body);

  todo = await Todo.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: todo });
});

//@desc Delete a single todo
//@route DELETE /api/v1/todos/:id
//@access public
exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return next(
      new ErrorResponse(`No todo item found with the id ${req.params.id}`, 404)
    );
  }

  if (todo.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Unauthorized access`, 401));
  }

  await todo.remove();

  res.status(200).json({ success: true, data: {} });
});
