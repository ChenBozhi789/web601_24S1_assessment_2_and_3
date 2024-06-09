const express = require('express');
const router = express.Router();
// Import User schema
const User = require('../models/User');
// Import note schema
const Note = require('../models/Note');

// Create User (POST request)
router.post('/', async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.username,
      number: req.body.number,
      password: req.body.password
  });

  try {
      // Try to save new user data to database
      const newUser = await user.save();
      // If success, a 201 status code and new user data are returned.
      res.status(201).json(newUser);
    } catch (err) {
      // If an error occurs, a 400 status code and error message are returned.
      res.status(400).json({ message: err.message });
    }
});

// Check All user (GET request)
router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete User (DELETE request)
router.delete('/:id', async (req, res) => {
  try {
    // 
    const user = await User.deleteOne({_id: req.params.id});
    // 
    if (user.deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Exports router module
module.exports = router;