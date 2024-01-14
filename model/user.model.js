const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false
  },
  education: {
    type: String,
    required: false
  },
  linkedIn: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  number: {
    type: String,
    required: false
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema, 'users');
