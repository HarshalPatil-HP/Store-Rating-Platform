import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.utils.js";
import { asyncHandler } from "../utils/async-handler.utils.js";
import { findById } from "../models/user.model.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request — no token provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "User not found for this token");
  }

  req.user = user;
  next();
});

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to perform this action");
    }
    next();
  };
};

export { verifyToken, requireRole };