import express from "express";
import { protect, isSuperAdmin } from "../middlewares/authMiddleware.js";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// superadmin can only register new staff
router.post("/register", protect, isSuperAdmin, register);
router.post("/login", login);

export default router;
