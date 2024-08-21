import Express from "express";
import multer from "multer";
// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/pages/images"); // Specify the directory to store uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filenames
  },
});

const upload = multer({ storage: storage });

import {
  registerProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getAllProperty,
} from "../controller/propertyController.js";

const router = Express.Router();

router.post("/register", upload.single("img"), registerProperty);
router.get("/getPropertyById/:id", getPropertyById);
router.get("/getAllProperty", getAllProperty);
router.put("/updateProperty", updateProperty);
router.delete("/deleteProperty/:id", deleteProperty);

export default router;
