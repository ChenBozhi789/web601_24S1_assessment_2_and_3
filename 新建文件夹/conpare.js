const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// 创建笔记（POST 请求）
router.post('/', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 查看所有笔记（GET 请求）
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 查看特定笔记（GET 请求）
router.get('/:id', getNote, (req, res) => {
  res.json(res.note);
});

// 更新笔记（PUT 请求）
router.put('/:id', getNote, async (req, res) => {
  if (req.body.title != null) {
    res.note.title = req.body.title;
  }
  if (req.body.content != null) {
    res.note.content = req.body.content;
  }
  try {
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除笔记（DELETE 请求）
router.delete('/:id', getNote, async (req, res) => {
  try {
    await res.note.remove();
    res.json({ message: 'Deleted Note' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 中间件：通过 ID 查找特定笔记
async function getNote(req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: 'Cannot find note' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.note = note;
  next();
}

module.exports = router;
