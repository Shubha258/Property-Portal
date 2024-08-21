import mongoose from "mongoose";
import User from "../models/userModel.js";
import Property from "../models/propertyModel.js"; // Import the Property model

const communicationSchema = new mongoose.Schema(
  {
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property_id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property", // Reference the Property model
      required: true,
    },
    message: { type: String, required: true },
    status: { // Add the status field
      type: Boolean,
      default: false, // Set default to 0 (false)
    },
  },
  { timestamps: true }
);

export default mongoose.model("Communication", communicationSchema);