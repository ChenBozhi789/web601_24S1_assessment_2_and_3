const express = require('express');
// Import bcrypt
const bcrypt = require("bcrypt");
// Import jwt
const jwt = require("jsonwebtoken");
// Import User schema
const User = require('../models/User');

const router = express.Router();

const SECRET_KEY ='my_first_secret_key';

// Login Router (User login authentication and Generate JWT)
router.post('/login', async (req, res) => {
  try {
      // Extract the email and password fields from the request body
      const { username, password } = req.body;

      // Find the user in the database that matches the email provided in the request
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Compare password in the request and password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      // return JWT
      res.status(200).json({ message: 'Login successful', token });

      } catch (err) {
          res.status(500).json({ message: 'Server error' });
      }
});

// Verify JWT router
router.post('/validate-token', (req, res) => {
  // Extract the token from the request header
  const token = req.header('Authorization').split(' ')[1]; 

  // If token not exists
  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  try {
      jwt.verify(token, SECRET_KEY);
      res.status(200).json({ message: 'Token is valid' });
  } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
  }
});

// Create User (POST request)
router.post('/', async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      number: req.body.number,
      password: req.body.password
  });

  try {
      // Save new user data to database
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