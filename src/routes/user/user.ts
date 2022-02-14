import { Router } from "express";
import { isAuthenticated } from "../../middlewares/AuthMiddleware";
import * as DashboardController from "../../controllers/User/DashboardController";

const router = Router();

router.get("/home", isAuthenticated, DashboardController.home);

export default router;
