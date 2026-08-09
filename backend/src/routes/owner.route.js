import { Router } from "express";
import { getOwnerDashboard } from "../controllers/owner.controller.js";
import { verifyToken, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/dashboard", verifyToken, requireRole("store_owner"), getOwnerDashboard);

export default router;