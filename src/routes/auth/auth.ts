import { Router } from "express";
import { isAuthenticated, isGuest } from "../../middlewares/AuthMiddleware";
import * as AuthController from "../../controllers/Auth/AuthController";

const router = Router();

router.get("/signup", AuthController.showRegisterForm);
router.post("/signup", AuthController.register);
router.get("/login", isGuest, AuthController.showLoginForm);
router.post("/login", AuthController.login);
router.get("/logout", isAuthenticated, AuthController.logout);

export default router;
