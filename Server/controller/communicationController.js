// Create a new message
import Communication from "../models/communicationModel.js";

export const createMessage = async (req, res) => {
  try {
    const { buyer_id, seller_id, message, property_id, status } = req.body;
    console.log(req.body);
    const newMessage = await Communication.create({
      buyer_id,
      seller_id,
      message,
      property_id,
      status,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages between two users
export const getMessages = async (req, res) => {
  try {
    const { buyer_id, seller_id } = req.query;

    let query = {};

    // If buyer_id is provided, filter by buyer_id
    if (buyer_id) {
      query.buyer_id = buyer_id;
    }

    // If seller_id is provided, filter by seller_id
    if (seller_id) {
      query.seller_id = seller_id;
    }

    // If neither buyer_id nor seller_id is provided, return all messages
    if (!buyer_id && !seller_id) {
      return res.status(400).json({ error: 'Please provide either buyer_id or seller_id' });
    }

    const messages = await Communication.find(query)
      .populate("buyer_id")
      .populate("seller_id") // Assuming you also have a seller_id field
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBuyerCommunications = async (req, res) => {
  try {
    const { buyer_id, seller_id } = req.body;
    const communications = await Communication.find({
      buyer_id: buyer_id,
      seller_id: seller_id,
    })
      .populate("buyer_id") // Populating references
      .exec();

    res.status(200).json(communications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching communications" });
  }
};

export const getSellerId = async (req, res) => {
  try {
    const buyerId = req.params.id;
    console.log(buyerId);
    const communications = await Communication.find({
      buyer_id: buyerId,
    }).populate("seller_id"); // Populate the seller_id field with User data

    // Extract the seller IDs from the communication records and use Set to get unique values
    const uniqueSellerIds = new Set(
      communications.map((communication) => communication.seller_id._id)
    );

    console.log(Array.from(uniqueSellerIds)); // Convert Set to Array
    res.status(200).json(Array.from(uniqueSellerIds)); // Return an array of unique seller IDs
  } catch (error) {
    console.error("Error getting seller IDs:", error);
    throw error; // Re-throw the error to handle it at a higher level
  }
};
