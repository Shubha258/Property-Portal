import mongoose from "mongoose";
import Property from "../models/propertyModel.js";

const ListingSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property", // Reference to the Property model
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

// Add on delete cascade for propertyId
ListingSchema.pre("remove", async function (next) {
  try {
    // Find the related Property document
    const property = await mongoose.model("Property").findById(this.propertyId);

    // If the Property document exists, delete it
    if (property) {
      await property.remove();
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Listing", ListingSchema);
