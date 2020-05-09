const TodoList = require('../models/TodoList');
const Todo = require('../models/Todo');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Add new TodoList
//@route    POST /api/v1/todolist/:name
//@access   Private
exports.addTodoList = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const name = req.params.name;
  if (!name) {
    return next(new ErrorResponse('Please send a name', 400));
  }
  const list = await TodoList.create({
    user,
    name,
  });

  res.status(200).json({ success: true, data: list });
});

//@desc     Delete a TodoList (and all it's items)
//@route    DELETE /api/v1/todolist/:id
//@access   Private
exports.deleteTodoList = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const { id } = req.params;
  const list = await TodoList.findById(id);
  if (!list) {
    return next(new ErrorResponse(`No list found with the id ${id}`, 400));
  }

  if (list.user.toString() !== user) {
    return next(new ErrorResponse(`Unauthorized access.`, 401));
  }

  if (req.user.defaultList.toString() === id) {
    return next(new ErrorResponse(`Cannot delete the default todo list.`, 200));
  }

  // Delete items belonging to this todo list
  await Todo.deleteMany({
    todolist: id,
  });

  // Remove the todolist itself
  await list.remove();
  res.status(200).json({ success: true, data: {} });
});

//@desc     Rename a TodoList
//@route    PUT /api/v1/todolist/:id/:name
//@access   Private
exports.renameTodoList = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const { id, name } = req.params;
  if (!req.params.name) {
    return next(new ErrorResponse(`Please send a name`, 400));
  }
  let list = await TodoList.findById(id);
  if (!list) {
    return next(new ErrorResponse(`No list found with the id ${id}`, 400));
  }
  if (list.user.toString() !== user) {
    return next(new ErrorResponse(`Unauthorized access.`, 401));
  }

  list = await TodoList.findByIdAndUpdate(
    id,
    {
      name,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ success: true, data: list });
});

//@desc     Get all TodoLists for a user
//@route    GET /api/v1/todolist
//@access   Private
exports.getAllTodoLists = asyncHandler(async (req, res, next) => {
  const lists = await TodoList.find({
    user: req.user.id,
  }).populate('todosCount');

  res.status(200).json({ success: true, data: lists });
});
