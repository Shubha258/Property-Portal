// Assuming you have set up your Node.js project with Express and MongoDB/Mongoose

import Property from "../models/propertyModel.js"; // Import your Property model

// Register a new property
export const registerProperty = async (req, res) => {
  try {
    const { location, address, propertyType, desc, price } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!location || !address || !propertyType || !img || !desc || !price) {
      console.log(address);
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const property = new Property({
      location,
      address,
      propertyType,
      img,
      desc,
      price,
    });

    // Save the property to the database
    await property.save();

    return res
      .status(201)
      .json({ message: "Property registered successfully.", property });
  } catch (error) {
    console.error("Error registering property:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//get property by ID
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyId = id;
    console.log(propertyId);
    // Find property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }

    return res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//get all property
export const getAllProperty = async (req, res) => {
  try {
    // Find all properties
    const properties = await Property.find();

    if (!properties) {
      return res.status(404).json({ error: "No properties found." });
    }

    return res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//update property
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyId = id;
    const { location, address, propertyType, img, desc, price } = req.body;

    // Find property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }

    // Update only changed fields
    if (location) property.location = location;
    if (address) property.address = address;
    if (propertyType) property.propertyType = propertyType;
    if (img) property.img = img;
    if (desc) property.desc = desc;
    if (price) property.price = price;

    await property.save();

    return res.status(200).json({ message: "Property updated successfully." });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//delete property

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyId = id;
    console.log(propertyId);
    // Find property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }

    // Delete property
    await Property.deleteOne({ _id: propertyId });

    return res.status(200).json({ message: "Property deleted successfully." });
  } catch (error) {
    console.error("Error deleting property:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
