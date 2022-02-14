import express from "express";
import auth from "./auth/auth";
import guest from "./guest/guest";
import user from "./user/user";

const router = express.Router();

router.use("/", guest);

router.use("/", auth);

router.use("/", user);

export default router;
