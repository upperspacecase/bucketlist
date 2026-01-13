import mongoose from "mongoose";

const sharedListSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: String,
            required: true,
            index: true,
        },
        participants: [{
            type: String, // userId
        }],
        items: [{
            title: {
                type: String,
                required: true,
                trim: true,
            },
            addedBy: {
                type: String,
                default: "You",
            },
            category: {
                type: String,
                default: "Adventure",
            },
            completed: {
                type: Boolean,
                default: false,
            },
            image: {
                type: String,
                default: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
            },
            completedBy: {
                type: String, // userId who completed it
            },
            completedAt: {
                type: Date,
            },
        }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.SharedList || mongoose.model("SharedList", sharedListSchema);
