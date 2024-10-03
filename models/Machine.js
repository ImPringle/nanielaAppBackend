const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  type: { type: String, required: false },
  machineNumber: { type: String, required: false },
  block: { type: String, required: false },
  letter: { type: String, required: false },
  brand: { type: String, required: false },
  model: { type: String, required: false },
  status: { type: String, required: false },
});
module.exports = mongoose.model("Machine", machineSchema);
