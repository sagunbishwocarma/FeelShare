const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, default: 'unfinished', enum: ['unfinished', 'completed'] },
});

const goalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    tasks: [taskSchema],
    status: { type: String, default: 'unfinished', enum: ['unfinished', 'completed'] },
});

module.exports = mongoose.model('Goal', goalSchema);