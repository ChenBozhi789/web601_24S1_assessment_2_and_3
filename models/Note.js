// Define Note data Schema
const mongoose = require('mongoose');
//
const Schema = mongoose.Schema;

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
  },
  // user: {
  //   type: Schema.Types.ObjectId, // 是 Mongoose 提供的一种类型，用于存储 MongoDB 中的 ObjectId。
  //   ref: 'User', // Reference User Model. Each Note belongs to a specific User.
  //   required: true
  // }
});

// Create a Text index
noteSchema.index({ title: 'text' });

module.exports = mongoose.model('Note', noteSchema);