// Import the express framework
const express = require('express');
// Create the Express router object
const router = express.Router(); 
// Import note schema
const Note = require('../models/Note')
// Import middleware verifyToken
const verifyToken = require('../models/verifyToken');

// Create Note (POST request)
router.post('/', verifyToken, async (req, res) => {
  const newnote = new Note({
    title: req.body.title,
    content: req.body.content,
    // Use the decoded user id of the JWT
    user: req.body._id
  });

  try {
    // Use newNote.save() function to save note data to database
    const newNote = await newnote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Check All Note (GET request)
router.get('/', verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id});
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check specific Note (GET request)
router.get('/:id', async (req, res) => {
  try {
    const notes = await Note.findById(req.params.id);
    if (notes) {
      res.json(notes);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit Note (PUT request) 
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const note = await Note.findById({id: req.params.id, user: req.user._id});
    if (note) {
      note.title = req.body.title || note.title;
      note.content = req.body.content || note.content;
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Note
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const note = await Note.deleteOne({_id: req.params.id, user: req.user._id});
    if (note.deletedCount === 1) {
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