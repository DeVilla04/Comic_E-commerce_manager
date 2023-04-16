import { Router } from "express";
import { signUp, signIn } from "../controller/userController.js";
import { authentication, destroyToken } from "../middleware/authentication.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", authentication, destroyToken);

export default router;
