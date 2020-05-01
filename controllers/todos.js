const Todo = require('../models/Todo');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asnyc');

//@desc Get all todos
//@route GET /api/v1/todos
//@access public
exports.getAllTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find();
  res.status(200).json({ success: true, data: todos });
});

//@desc Add a new todo
//@route POST /api/v1/todos
//@access public
exports.addTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({ success: true, data: todo });
});

//@desc Get a single todo
//@route GET /api/v1/todos/:id
//@access public
exports.getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return ErrorResponse(
      `No todo item found with the id ${req.params.id}`,
      404
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
    return ErrorResponse(
      `No todo item found with the id ${req.params.id}`,
      404
    );
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
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
    return ErrorResponse(
      `No todo item found with the id ${req.params.id}`,
      404
    );
  }

  await todo.remove();

  res.status(200).json({ success: true, data: {} });
});
