import Express from "express";
import {
  createListingController,
  getListingController,
  updateListingController,
  deleteListingController,
  getListingControllerBysellerId,
  getListingControllerByPropertyId,
} from "../controller/listingController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
const router = Express.Router();

router.post("/createListing", createListingController);
router.get("/getListing", getListingController);
router.put("/updateListing", updateListingController);
router.get("/getListingByPropertyId/:id", getListingControllerByPropertyId);
router.get("/getListingById/:id", getListingControllerBysellerId);
router.delete("/deleteListing", deleteListingController);

export default router;
