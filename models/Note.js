// Import 'mongoose'
const mongoose = require('mongoose');
// Define Schema and 
const Schema = mongoose.Schema;

// Define note Schema
const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a Text index
noteSchema.index({ title: 'text' });

// Exports note model
module.exports = mongoose.model('Note', noteSchema);