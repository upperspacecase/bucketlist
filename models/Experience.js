import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: false,
            trim: true,
            default: "Worldwide",
        },
        country: {
            type: String,
            required: false,
            trim: true,
            default: "Worldwide",
        },
        image: {
            type: String,
            required: false,
            default: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
        },
        category: {
            type: String,
            required: false,
            enum: ["Adventure", "Culture", "Nature", "Food", "Festivals", "Wellness"],
            default: "Adventure",
        },
        region: {
            type: String,
            required: false,
            enum: ["asia", "europe", "africa", "americas", "oceania"],
            default: "americas",
        },
        year: {
            type: String,
        },
        savedCount: {
            type: Number,
            default: 0,
        },
        // New fields for app functionality
        userId: {
            type: String,
            required: true,
            index: true, // Index for faster queries
        },
        completed: {
            type: Boolean,
            default: false,
        },
        addedBy: {
            type: String,
            default: "You",
        },
        difficulty: {
            type: String,
            required: false,
            enum: ["easy", "moderate", "bucket-list"],
            default: "easy",
        },
        bestTime: {
            type: String,
        },
        budget: {
            type: String,
        },
        tips: {
            type: String,
        },
        website: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
