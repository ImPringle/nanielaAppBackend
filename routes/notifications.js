const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { title, message, status, eventId, createdBy, createdById, solvedBy } = req.body;
  try {
    const newNoti = new Notification({
      title,
      message,
      status,
      eventId,
      createdBy, 
      createdById, 
      solvedBy
    });
    await newNoti.save();
    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const notiById = await Notification.findOne({
      _id: id,
    });
    res.json(notiById);
  } catch (error) {
    console.error("Error fetching noti:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
