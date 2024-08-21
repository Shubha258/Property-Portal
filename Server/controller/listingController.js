import Listing from "../models/listingModel.js";
import mongoose from "mongoose";

// Create a new listing
export const createListingController = async (req, res) => {
  console.log(req.body);
  try {
    const { sellerId, propertId } = req.body;
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all listings
export const getListingController = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//getiing list by sellerid
// API endpoint to get property IDs associated with a seller

export const getListingControllerBysellerId = async (req, res) => {
  try {
    const sellerId = req.params.id; // Extract the id from req.params
    console.log(sellerId);
    // const sellerObjectId = mongoose.Types.ObjectId(sellerId); // Convert to ObjectId

    const properties = await Listing.find({ sellerId }); // Use the converted ObjectId
    const propertyIds = properties.map((property) => property.propertyId);
    // console.log(propertyIds);
    res.status(200).json(propertyIds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//getting sellerid using property id
export const getListingControllerByPropertyId = async (req, res) => {
  try {
    const propertyId = req.params.id; // Extract the id from req.params
    console.log(propertyId);
    const listing = await Listing.findOne({ propertyId }); // Use the converted ObjectId
    if (listing) {
      res.status(200).send(listing);
    } else {
      res.status(404).send({ message: "Listing not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a listing

export const updateListingController = async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a listing
export const deleteListingController = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
