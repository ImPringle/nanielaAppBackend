const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { title, message, status } = req.body;
  try {
    const newTask = new Task({
      title,
      message,
      status,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/complete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status: "completed" }, // Set status to "complete"
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).send("Item not found");
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
