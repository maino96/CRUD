const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comments", commentSchema);
