require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/health", require("./routes/health"));
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) =>
  res.send({ ok: true, message: "Corner Stone backend running" }),
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
