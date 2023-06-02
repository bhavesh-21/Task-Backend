const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
});

router.get('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  console.log("Id"+taskId)
  try {
    const tasks = await Task.findById(taskId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Task With Id Not Exist' });
  }
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { title, description, completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

router.patch('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

router.delete('/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
