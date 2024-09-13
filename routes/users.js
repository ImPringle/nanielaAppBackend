const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
