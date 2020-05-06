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
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Reverse populate with virtuals
TodoListSchema.virtual('todosCount', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'todolist',
  justOne: false,
  count: true,
});

TodoListSchema.set('toObject', { virtuals: true });
TodoListSchema.set('toJSON', { virtuals: true });

const TodoListModel = mongoose.model('TodoList', TodoListSchema);

module.exports = TodoListModel;
