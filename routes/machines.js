const express = require("express");
const Machine = require("../models/Machine");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { type, machineNumber, block, letter, brand, model, status } = req.body;
  try {
    const newMachine = new Machine({
      type,
      machineNumber,
      block,
      letter,
      brand,
      model,
      status,
    });
    await newMachine.save();
    res.status(201).json({ message: "Maintenance created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const machines = await Machine.find().sort();
    res.json(machines);
  } catch (error) {
    console.error("Error fetching machines:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const machineById = await Machine.findOne({
      _id: id,
    });
    res.json(machineById);
  } catch (error) {
    console.error("Error fetching machine:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
