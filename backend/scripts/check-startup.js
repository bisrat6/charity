require("dotenv").config();
const connectDB = require("../config/database");
const mongoose = require("mongoose");
const User = require("../models/User");
const Campaign = require("../models/Campaign");

const run = async () => {
  await connectDB();
  try {
    const existing = await User.findOne({ email: "sample@local" });
    if (!existing) {
      const u = new User({
        name: "Sample User",
        email: "sample@local",
        password: "changeme",
      });
      await u.save();
      console.log("Created sample user");
    }

    const c = await Campaign.findOne({ title: "Sample Campaign" });
    if (!c) {
      await new Campaign({
        title: "Sample Campaign",
        description: "Auto-created campaign",
        goal: 1000,
      }).save();
      console.log("Created sample campaign");
    }
  } catch (err) {
    console.error("Startup check error:", err);
  } finally {
    mongoose.connection.close();
  }
};

run();
