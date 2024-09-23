const express = require("express");
// const verifyToken = require("../middleware/authMiddleware");
const Maintenance = require("../models/Maintenance");
const router = express.Router();

// router.get("/all", verifyToken, async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user information:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/create", async (req, res) => {
  const { machine, machineNumber, type, action } = req.body;
  try {
    const newMaintenance = new Maintenance({
      machine,
      machineNumber,
      type,
      action,
    });
    await newMaintenance.save();
    res.status(201).json({ message: "Maintenance created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
