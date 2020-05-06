const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Task cannot be empty'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    todolist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TodoList',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
