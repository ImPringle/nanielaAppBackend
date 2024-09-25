const express = require("express");
const Maintenance = require("../models/Maintenance");
const router = express.Router();

router.get("/pending", async (req, res) => {
  try {
    const pendingMaintenances = await Maintenance.find({
      status: "pending",
    }).sort({ createdAt: -1 });
    res.json(pendingMaintenances);
  } catch (error) {
    console.error("Error fetching maintenances:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/complete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updatedItem = await Maintenance.findByIdAndUpdate(
      id,
      { status: "completed" }, // Set status to "complete"
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).send("Item not found");
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  const { machine, machineNumber, type, action, status } = req.body;
  try {
    const newMaintenance = new Maintenance({
      machine,
      machineNumber,
      type,
      action,
      status,
    });
    await newMaintenance.save();
    res.status(201).json({ message: "Maintenance created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
