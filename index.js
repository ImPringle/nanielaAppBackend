const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const maintenanceRoutes = require("./routes/maintenances");
const notificationRoutes = require("./routes/notifications");
const tasksRoutes = require("./routes/tasks");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/tasks", tasksRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// console.log(process.env.MONGO_URI);
