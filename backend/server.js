require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/database"); // use local database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/health", require("./routes/health"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/volunteers", require("./routes/volunteers"));
app.use("/api/donations", require("./routes/donations"));

// Root endpoint
app.get("/", (req, res) =>
  res.send({ ok: true, message: "Corner Stone backend running" }),
);

// Start server
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  ),
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error("Unhandled Rejection:", err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app; // For testing
