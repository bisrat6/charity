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
      email: "admin@gmail.com",
      password: plainPw,
      role: "admin",
    });
    const user = await User.create({
      fullName: "Dev User",
      email: "user@gmail.com",
      password: plainPw,
    });

    const campaigns = [
      {
        title: "Clean Water for Rural Villages",
        description: "Access to clean water is a fundamental human right, yet thousands in our rural communities walk miles every day just to fetch contaminated water. This campaign aims to drill 5 deep-water wells in the driest regions, providing safe, sustainable drinking water to over 2,500 people.\n\nYour donation will fund the heavy machinery required for drilling, the installation of solar-powered pumps, and community training on maintenance. By securing a local water source, we can reduce waterborne diseases by 80% and allow children—especially girls—to attend school instead of spending hours fetching water.\n\nJoin us in bringing life and health to these villages. Every drop counts.",
        goalAmount: 15000,
        currentAmount: 8500,
        status: "active",
      },
      {
        title: "Urban Youth Mentorship",
        description: "Talent is everywhere, but opportunity is not. Our Urban Youth Mentorship program connects at-risk high school students with professionals from various industries including tech, healthcare, and finance. We believe that one positive role model can change the trajectory of a young person's life.\n\nFunds raised will cover transportation for students, workshop materials, background checks for mentors, and college application fees. We also organize monthly career days and leadership retreats.\n\nHelp us build the next generation of leaders by giving them the guidance they deserve today.",
        goalAmount: 5000,
        currentAmount: 1200,
        status: "active",
      },
      {
        title: "Emergency Medical Fund",
        description: "Medical emergencies strike without warning, and for families living paycheck to paycheck, a single diagnosis can lead to financial ruin. This fund creates a safety net for urgent surgeries, expensive medications, and post-operative care for uninsured community members.\n\nWhether it's a child needing a heart operation or a father requiring emergency dialysis, your contribution provides immediate relief. We partner with local hospitals to pay bills directly, ensuring 100% of the aid goes to medical costs.\n\nBe the lifeline for a neighbor in their darkest hour.",
        goalAmount: 25000,
        currentAmount: 18000,
        status: "active",
      },
      {
        title: "Tech Education for Girls",
        description: "The tech industry suffers from a massive gender gap. We are changing that, one class at a time. This campaign funds intensive 12-week coding bootcamps specifically designed for young women in underrepresented communities.\n\nEach participant receives a laptop, high-speed internet access at home, and one-on-one tutoring. The curriculum covers HTML, CSS, JavaScript, and Python, empowering them to build their own futures in the digital economy.\n\nInvest in a girl's education, and you invest in the future of innovation.",
        goalAmount: 10000,
        currentAmount: 4500,
        status: "active",
      },
      {
        title: "Community Garden Project",
        description: "Food deserts leave many of our neighbors without access to fresh, healthy produce. This project is transforming a vacant city lot into a vibrant community garden. It will provide organic vegetables to 50 local families and serve as a green sanctuary for the neighborhood.\n\nWe need tools, seeds, soil, and fencing. The garden will also host weekly workshops on nutrition and sustainable agriculture for local schools.\n\nLet's grow something beautiful together. Your support plants the seeds of health and community.",
        goalAmount: 3000,
        currentAmount: 3000,
        status: "completed",
      },
      {
        title: "Disaster Relief: Flood Victims",
        description: "Recent devastating floods have left hundreds of families homeless in the river valley region. Homes have been destroyed, and essential infrastructure is damaged. We are on the ground providing immediate emergency relief.\n\nYour donation supplies hygiene kits, blankets, clean water, and temporary shelter. Once the waters recede, we will shift focus to repairing homes and restoring power.\n\nTime is of the essence. Please give what you can to help these families rebuild their lives from the mud up.",
        goalAmount: 50000,
        currentAmount: 22000,
        status: "active",
      },
      {
        title: "Senior Care Support",
        description: "Our elderly population often suffers from isolation and lack of mobility. This initiative funds a mobile care team that visits isolated seniors, creating a bridge to the outside world.\n\nServices include grocery delivery, transportation to medical appointments, and basic home repairs to ensure safety. More importantly, our volunteers provide companionship to combat loneliness.\n\nHelp us honor and care for those who built our community.",
        goalAmount: 8000,
        currentAmount: 1500,
        status: "active",
      },
      {
        title: "Wildlife Conservation",
        description: "Poaching and habitat loss threaten our local wildlife sanctuary. This campaign supports the rangers who patrol the park day and night to protect endangered species. \n\nFunds will purchase new patrol vehicles, GPS tracking collars for elephants, and surveillance drones. We also fund community education programs to reduce human-wildlife conflict.\n\nProtecting nature is protecting our heritage. Join the fight to save these magnificent creatures before it's too late.",
        goalAmount: 12000,
        currentAmount: 6000,
        status: "active",
      },
      {
        title: "Mental Health Awareness",
        description: "Mental health is just as important as physical health, yet stigma often prevents people from seeking help. This campaign funds free counseling sessions and support groups for low-income residents.\n\nWe also conduct workshops in schools and workplaces to teach coping mechanisms and how to recognize signs of distress in others.\n\nYour support breaks the silence and provides a path to healing for those struggling alone.",
        goalAmount: 6000,
        currentAmount: 900,
        status: "active",
      },
      {
        title: "School Breakfast Program",
        description: "It's hard to learn when you're hungry. Teachers report that many students arrive at school with empty stomachs, unable to focus. Our breakfast program ensures every child starts the day with a nutritious meal.\n\nWe provide hot oatmeal, fruit, eggs, and milk every morning before the first bell rings. For $10, you can feed a student for an entire month.\n\nFeed a child, fuel a mind. Help us end classroom hunger.",
        goalAmount: 4000,
        currentAmount: 3800,
        status: "active",
      },
      {
        title: "Micro-loans for Entrepreneurs",
        description: "Small businesses are the backbone of the economy. Our micro-loan fund provides interest-free capital to aspiring entrepreneurs who don't have access to traditional banking.\n\nFrom a seamstress needing a new machine to a carpenter buying wood, these small loans catalyze big changes. As loans are repaid, the money is recycled to help new applicants, creating a cycle of prosperity.\n\n empower a family to lift themselves out of poverty through their own hard work.",
        goalAmount: 20000,
        currentAmount: 15000,
        status: "active",
      },
      {
        title: "Refugee Housing Initiative",
        description: "Fleeing conflict and persecution, refugee families arrive with nothing but hope. Finding safe, affordable housing is their biggest hurdle. We provide rental deposits and first month's rent to help them secure a home.\n\nWe also collect furniture donations to turn empty apartments into welcoming homes. Stability starts with a roof over your head.\n\nWelcome our new neighbors with the security of a home.",
        goalAmount: 35000,
        currentAmount: 12000,
        status: "active",
      },
      {
        title: "Literacy for All",
        description: "Adult illiteracy traps people in low-paying jobs and limits their ability to navigate society. Our evening classes teach reading, writing, and basic math to adults who missed out on education.\n\nWe also run a mobile library that brings books to underserved neighborhoods. Reading opens doors that were previously locked.\n\nGive the gift of literacy and unlock potential.",
        goalAmount: 2500,
        currentAmount: 500,
        status: "active",
      },
      {
        title: "Renewable Energy Access",
        description: "Off-grid rural health centers struggle to refrigerate vaccines and power lights for night deliveries. We are installing comprehensive solar power systems in 10 rural clinics.\n\nThis reliable energy ensures that lifesaving medicines don't spoil and that doctors can treat patients 24/7. It's a green solution for a critical health problem.\n\nPowering health with the sun.",
        goalAmount: 18000,
        currentAmount: 18000,
        status: "completed",
      },
      {
        title: "Arts & Culture Festival",
        description: "Our diverse community is our strength. This annual festival celebrates the music, art, dance, and food of the many cultures that call our city home. \n\nYour donation pays for local artists, stage equipment, and security, allowing us to keep the event free for the public. It's a day of unity, joy, and understanding.\n\nCelebrate diversity and bring our community together.",
        goalAmount: 5000,
        currentAmount: 2000,
        status: "active",
      }
    ];

    const campaignDocs = [];
    for (const camp of campaigns) {
      const created = await Campaign.create({
        ...camp,
        createdBy: admin._id,
      });
      campaignDocs.push(created);

      // Create a corresponding donation to make stats match
      if (camp.currentAmount > 0) {
        await Donation.create({
          userId: user._id,
          amount: camp.currentAmount,
          currency: "ETB",
          donationType: "one-time",
          status: "completed",
          tier: "custom",
          stripePaymentIntentId: `seed_pay_${created._id}_${Date.now()}`
        });
      }
    }
    const camp1 = campaignDocs[0];
    const camp2 = campaignDocs[1];

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
