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
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Adventure", "Culture", "Nature", "Food", "Festivals", "Wellness"],
    },
    region: {
      type: String,
      required: true,
      enum: ["asia", "europe", "africa", "americas", "oceania"],
    },
    year: {
      type: String,
    },
    savedCount: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "moderate", "bucket-list"],
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
