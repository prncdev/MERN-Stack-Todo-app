const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending'
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
