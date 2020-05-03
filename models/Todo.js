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
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
