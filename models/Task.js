const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Task", userSchema);
