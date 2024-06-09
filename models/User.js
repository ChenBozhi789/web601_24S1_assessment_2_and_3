// Import 'mongoose'
const mongoose = require('mongoose');
// Define Schema 
const Schema = mongoose.Schema;

// Define user Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
    email: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

// Create index for username and email
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

// Exports user model
module.exports = mongoose.model('User', userSchema);