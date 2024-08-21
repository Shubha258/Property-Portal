import Express from "express";
import {createMessage, getMessages,getBuyerCommunications,getSellerId} from "../controller/communicationController.js"
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = Express.Router();

router.post("/createMessage", createMessage)
router.get("/getMessage", getMessages);
router.get("/getBuyerCommunication", getBuyerCommunications);
router.get("/getSellerId/:id",getSellerId)
export default router;
