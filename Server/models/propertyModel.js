import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    enum: ["Apartment", "House", "Land", "Rent"], // Define allowed property types
    required: true,
  },
  img: {
    type: String, // Store image URL or path
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Property", propertySchema);
