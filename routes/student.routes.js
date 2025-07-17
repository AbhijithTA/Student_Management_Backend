import express from "express";
import { protect } from "../middlewares/authmiddleware.js";
import { allowedWithPermission } from "../middlewares/roleMiddleware.js";
import { createStudent, deleteStudent, getStudents, updateStudent } from "../controllers/student.controller.js";
const router = express.Router();


router.use(protect);
router.post("/", allowedWithPermission("create"),createStudent);
router.get("/", allowedWithPermission("view"),getStudents);
router.put("/:id", allowedWithPermission("edit"),updateStudent);
router.delete("/:id", allowedWithPermission("delete"),deleteStudent);

export default router;