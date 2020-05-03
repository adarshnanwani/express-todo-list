const TodoList = require('../models/TodoList');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../middleware/error');

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

  list = await list.findByIdAndUpdate(
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
