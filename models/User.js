// Import 'mongoose'
const mongoose = require('mongoose');
// Import 'bcrypt'
const bcrypt = require("bcrypt");

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

// Before saving data, hash the password
userSchema.pre('save', async function(next) {
  // Check if the password field has been modified or if the document is new
  if (this.isModified('password') || this.isNew) {
    try {
      // Define the number of salt rounds
      const saltRounds = 10;
      // Hash the password with the defined number of salt rounds
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      // Replace the plain password with the hashed one
      this.password = hashedPassword;
      // Proceed to the next middleware or save function
      next();
    } catch (err) {
      // If an error occurs, pass it to the next middleware
      next(err);
    }
  } else {
    // If the password hasn't been modified, proceed to the next middleware
    next();
  }
});

// Exports user model
module.exports = mongoose.model('User', userSchema);