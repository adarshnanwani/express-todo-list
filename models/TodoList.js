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
    items: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Todo',
    },
  },
  {
    timestamps: true,
  }
);

const TodoListModel = mongoose.model('TodoList', TodoListSchema);

module.exports = TodoListModel;
