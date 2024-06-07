const express = require('express');
//
const router = express.Router(); 
//
const Note = require('../models/Note')

// Create Note (POST request)
router.post('/', async (req, res) => {
  const newnote = new Note({
    title: req.body.title,
    content: req.body.content
  });

  try {
    // 返回 Promise 对象并存储到 newNote 变量中
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
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit Note (PUT request)
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

// Delete Note (DELETE request)
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      await note.remove();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;