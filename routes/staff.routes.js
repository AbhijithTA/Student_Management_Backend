import express from "express";
import { isSuperAdmin, protect } from "../middlewares/authmiddleware.js";
import { assignPermissions, createStaff, deleteStaff, getAllStaff, updateStaff } from "../controllers/staff..controller.js";
const router = express.Router();

router.use(protect);
router.post("/",isSuperAdmin, createStaff);
router.get("/", isSuperAdmin, getAllStaff);
router.put("/:id", isSuperAdmin, updateStaff);
router.delete("/:id", isSuperAdmin, deleteStaff);
router.post("/permission/:staffId", isSuperAdmin, assignPermissions);

export default router;