import { Router } from "express";
import * as GuestController from "../../controllers/GuestController";

const router = Router();

router.get("/", GuestController.welcome);

export default router;
