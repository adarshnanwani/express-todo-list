const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the list name'],
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

const TodoListModel = mongoose.model('TodoList', TodoListSchema);

module.exports = TodoListModel;
