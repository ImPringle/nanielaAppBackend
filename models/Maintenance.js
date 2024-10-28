const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  machine: { type: String, required: true },
  machineNumber: { type: String, required: true },
  type: { type: String, required: true },
  action: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: { type: String, required: true },
  createdById: { type: String, required: true },
  solvedBy: { type: String, required: true },
});
module.exports = mongoose.model("Maintenance", userSchema);
