import express from "express";
import connectDB from "./db.js";
import authRoute from "./Route/authRoute.js";
import propertyRoute from "./Route/propertyRoute.js";
import listingRoute from "./Route/listingRoute.js";
import communicationRoute from "./Route/communicationRoute.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv
import multer from "multer";

const app = express();

// Load environment variables from .env file
dotenv.config();

// Database connection (replace with your actual database setup)
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoute); //authentication
app.use("/api/property", propertyRoute); //property Route
app.use("/api/listing", listingRoute);
app.use("/api/communication", communicationRoute);

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "../client/src.pages/images",
      express.static(path.join(_dirname, "images"))
    ); // Specify the directory to store uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filenames
  },
});

const upload = multer({ storage: storage });

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
