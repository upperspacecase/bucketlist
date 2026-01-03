
import mongoose from "mongoose";
import Experience from "./models/Experience";
import { experiences } from "./libs/experiences";
import connectMongo from "./libs/mongoose";

require("dotenv").config({ path: ".env.local" });

const seedDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await connectMongo();
        console.log("Connected!");

        console.log("Clearing existing experiences...");
        await Experience.deleteMany({});

        console.log("Seeding experiences...");
        // Remove the 'id' field as MongoDB uses '_id'
        const experiencesData = experiences.map(({ id, ...rest }) => rest);

        await Experience.insertMany(experiencesData);

        console.log("✅ Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
