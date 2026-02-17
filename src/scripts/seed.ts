import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../models/Project";
import Testimonial from "../models/Testimonial";
import Admin from "../models/Admin";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

const projects = [
  {
    image: "/image/chart.png",
    category: "Web Application",
    title: "FinFlow Dashboard",
    description:
      "A comprehensive financial analytics dashboard with enterprise-level data visualization and real-time analytics.",
  },
  {
    image: "/image/chart2.png",
    category: "Mobile Application",
    title: "Analytics Platform",
    description:
      "Mobile-first financial management app with intuitive navigation and real-time analytics.",
  },
  {
    image: "/image/chart.png",
    category: "Web Application",
    title: "Data Visualization",
    description:
      "A comprehensive financial analytics dashboard with enterprise-level data visualization and real-time analytics.",
  },
  {
    image: "/image/chart2.png",
    category: "Web Application",
    title: "Enterprise Dashboard",
    description:
      "A comprehensive financial analytics dashboard with enterprise-level data visualization and real-time analytics.",
  },
];

const testimonials = [
  {
    name: "Martha Augustin",
    role: "Website Design",
    avatar: "/testimonials/avatar1.jpg",
    quote:
      "Working with Mosud was an absolute pleasure. The design quality and attention to detail was exceptional. Highly recommend for any design project.",
  },
  {
    name: "Martha Augustin",
    role: "Website Design",
    avatar: "/testimonials/avatar2.jpg",
    quote:
      "Excellent work on our website redesign. The user experience improved dramatically and our conversion rates have never been better.",
  },
  {
    name: "Martha Augustin",
    role: "Website Design",
    avatar: "/testimonials/avatar3.jpg",
    quote:
      "The attention to detail and creative problem-solving made all the difference. Our users love the new interface design.",
  },
];

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Admin.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Seed projects
    await Project.insertMany(projects);
    console.log(`📦 Seeded ${projects.length} projects`);

    // Seed testimonials
    await Testimonial.insertMany(testimonials);
    console.log(`💬 Seeded ${testimonials.length} testimonials`);

    // Seed admin user
    const admin = new Admin({
      email: "mosudrhs@gmail.com",
      password: "mosud1234@@",
    });
    await admin.save();
    console.log("👤 Created admin user: mosudrhs@gmail.com");

    console.log("\n🎉 Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
