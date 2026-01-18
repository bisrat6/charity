require("dotenv").config();
const connectDB = require("../config/database");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Campaign = require("../models/Campaign");
const Donation = require("../models/Donation");
const Volunteer = require("../models/Volunteer");

const seed = async () => {
  if (process.env.NODE_ENV === "production") {
    console.error("Refusing to run seed in production");
    process.exit(1);
  }

  await connectDB();

  try {
    console.log("Clearing dev collections...");
    await Promise.all([
      User.deleteMany({}),
      Campaign.deleteMany({}),
      Donation.deleteMany({}),
      Volunteer.deleteMany({}),
    ]);

    console.log("Creating users...");
    const pw = await bcrypt.hash("password123", 10);
    const admin = await User.create({
      name: "Admin",
      email: "admin@local",
      password: pw,
      role: "admin",
    });
    const user = await User.create({
      name: "Dev User",
      email: "user@local",
      password: pw,
    });

    console.log("Creating campaigns...");
    const camp1 = await Campaign.create({
      title: "Community Relief",
      description: "Help local families",
      goal: 5000,
      raised: 250,
    });
    const camp2 = await Campaign.create({
      title: "School Supplies",
      description: "Support kids education",
      goal: 2000,
      raised: 100,
    });

    console.log("Creating donations...");
    await Donation.create({
      donor: user._id,
      amount: 50,
      currency: "USD",
      campaign: camp1._id,
    });
    await Donation.create({
      donor: user._id,
      amount: 25,
      currency: "USD",
      campaign: camp2._id,
    });

    console.log("Creating volunteer entries...");
    await Volunteer.create({
      user: user._id,
      message: "Happy to help locally",
      status: "pending",
    });

    console.log("Seeding complete.");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seed();
