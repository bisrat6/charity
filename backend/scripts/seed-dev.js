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
    const plainPw = "password123";
    // Let model pre-save hook hash the password
    const admin = await User.create({
      fullName: "Admin",
      email: "admin@local",
      email: "admin@example.com",
      password: plainPw,
      role: "admin",
    });
    const user = await User.create({
      fullName: "Dev User",
      email: "user@example.com",
      password: plainPw,
    });

    console.log("Creating campaigns...");
    const camp1 = await Campaign.create({
      title: "Community Relief",
      description: "Help local families",
      goalAmount: 5000,
      currentAmount: 0,
      status: "active",
      createdBy: admin._id,
    });
    const camp2 = await Campaign.create({
      title: "School Supplies",
      description: "Support kids education",
      goalAmount: 2000,
      currentAmount: 0,
      status: "active",
      createdBy: admin._id,
    });

    console.log("Creating donations...");
    const d1 = await Donation.create({
      userId: user._id,
      amount: 50,
      currency: "USD",
      donationType: "one-time",
      status: "completed",
    });
    // increment campaign currentAmount to reflect donation
    await Campaign.findByIdAndUpdate(camp1._id, {
      $inc: { currentAmount: d1.amount },
    });

    const d2 = await Donation.create({
      userId: user._id,
      amount: 25,
      currency: "USD",
      donationType: "one-time",
      status: "completed",
    });
    await Campaign.findByIdAndUpdate(camp2._id, {
      $inc: { currentAmount: d2.amount },
    });

    console.log("Creating volunteer entries...");
    await Volunteer.create({
      userId: user._id,
      phone: "+250700000000",
      skillset: ["community outreach"],
      availability: "weekends",
      interests: ["education"],
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
