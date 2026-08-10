import { Router } from "express";
import { verifyToken, requireRole } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import {
  getDashBoardStats,
  createUserByAdmin,
  getUsers,
  createStoreByAdmin,
  getStores,
  getUserDetails,
  getStoreDetails
} from "../controllers/admin.controller.js";
import { createUserByAdminValidators } from "../validators/user.validator.js";
import { createStoreValidators } from "../validators/store.validator.js";

const adminRouter = Router();

adminRouter.use(verifyToken, requireRole("admin")); 

adminRouter.get("/dashboard", getDashBoardStats);
adminRouter.post("/users", createUserByAdminValidators(), validate, createUserByAdmin);
adminRouter.get("/users", getUsers);
adminRouter.get("/users/:id", getUserDetails);
adminRouter.post("/stores", createStoreValidators(), validate, createStoreByAdmin);
adminRouter.get("/stores", getStores);
adminRouter.get("/stores/:id", getStoreDetails);

export default adminRouter;