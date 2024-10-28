const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  eventId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: { type: String, required: true },
  createdById: { type: String, required: true },
  solvedBy: { type: String, required: true },
});
module.exports = mongoose.model("Notification", userSchema);
