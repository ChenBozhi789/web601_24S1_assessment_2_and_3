const express = require('express');
//
const router = express.Router(); 
// Import note schema
const Note = require('../models/Note')

// Create Note (POST request)
router.post('/', async (req, res) => {
  const newnote = new Note({
    title: req.body.title,
    content: req.body.content
  });

  try {
    // Use newnote.save() function to save note data to database
    const newNote = await newnote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Check All Note (GET request)
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check Note (GET request)
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

// Edit Note (PUT request) 未测试
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
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
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.deleteOne({_id: req.params.id});
    if (note.deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;