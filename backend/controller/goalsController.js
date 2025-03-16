const express = require('express');
const Goal = require('../models/goals');
const router = express.Router();

// Add a new goal
const addGoal = async (req, res) => {
  try {
    const { title, tasks, userId } = req.body;


    const goal = await Goal.create({ 
        user: userId,
        title, 
        tasks });

    res.json(goal);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to add goals' });
  }
};

// Get all goals
const getGoalById =async (req, res) => {
  try {
    const {userId} = req.body;
    const goals = await Goal.find({ user : userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
};

// Update task completion status
// router.put('/:goalId/tasks/:taskId', 
const updateTask = async (req, res) => {

  try {
    const { goalId, taskId } = req.params;
    const { completed } = req.body;

    const goal = await Goal.findById(goalId);
    const task = goal.tasks.id(taskId);
    task.completed = completed;

    // Check if all tasks are completed
    const allTasksCompleted = goal.tasks.every(task => task.completed);
    if (allTasksCompleted) {
      goal.status = 'Completed';
    } else {
      goal.status = 'UnFinished';
    }

    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    addGoal,
    getGoalById,
    updateTask

}