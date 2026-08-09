import { Router } from "express";
import { getStores, submitRating } from "../controllers/user.controller.js";
import { verifyToken, requireRole } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { submitRatingValidators } from "../validators/rating.validator.js";

const router = Router();

router.get("/stores", verifyToken, requireRole("normal"), getStores);

router.post("/stores/:storeId/rating", verifyToken, requireRole("normal"), submitRatingValidators(), validate, submitRating);

export default router;