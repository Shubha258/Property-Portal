import Express from "express";
import {
  registerController,
  loginController,
  updateUserController,getUserController
} from "../controller/authController.js";
// import { loginController } from "../controller/authLogin.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = Express.Router();

// post method for register
console.log("hello");
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getUser/:id", getUserController);
router.put("/updateUser/:id", updateUserController);

router.get("/user-auth", requireSignIn, loginController, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/test", (req, res) => {
  console.log("form route");
  res.send("Hello from the test route!");
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  console.log(res);
  res.status(200).send({ ok: true });
});

export default router;
