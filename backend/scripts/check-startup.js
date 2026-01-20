require("dotenv").config();
const connectDB = require("../config/database");
const mongoose = require("mongoose");
const User = require("../models/User");
const Campaign = require("../models/Campaign");

const run = async () => {
  await connectDB();
  try {
    const existing = await User.findOne({ email: "sample@example.com" });
    if (!existing) {
      const u = new User({
        fullName: "Sample User",
        email: "sample@example.com",
        password: "changeme",
      });
      await u.save();
      console.log("Created sample user");
    }

    const c = await Campaign.findOne({ title: "Sample Campaign" });
    if (!c) {
      // Create sample campaign with required fields
      const adminUser = await User.findOne({ email: "admin@example.com" });
      const creatorId = adminUser ? adminUser._id : existing ? existing._id : null;

      if (creatorId) {
        await new Campaign({
          title: "Sample Campaign",
          description: "Auto-created campaign",
          goalAmount: 1000,
          createdBy: creatorId,
        }).save();
        console.log("Created sample campaign");
      } else {
        console.log("No user found to create campaign");
      }
    }
  } catch (err) {
    console.error("Startup check error:", err);
  } finally {
    mongoose.connection.close();
  }
};

run();
