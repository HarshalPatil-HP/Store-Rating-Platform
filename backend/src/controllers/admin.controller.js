import { asyncHandler } from "../utils/async-handler.utils.js";
import { ApiError } from "../utils/api-error.utils.js";
import { ApiResponse } from "../utils/api-resolve.utils.js";
import { createUser, listUsers, countUsers, findById as findUserById, findByEmail } from "../models/user.model.js";
import { createStore, listStores, countStores, findById as findStoreById, findStoreByEmail, findStoreByOwnerId } from "../models/store.model.js";
import { countRatings, getAverageRatingForStore } from "../models/rating.model.js";
import bcrypt from "bcrypt";

const getDashBoardStats = asyncHandler(async (req, res) => {
  const totalUsers = await countUsers();
  const totalStores = await countStores();
  const totalRatings = await countRatings();

  return res.status(200).json(
    new ApiResponse(200, { totalUsers, totalStores, totalRatings }, "Dashboard statistics retrieved successfully")
  );
});

const createUserByAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, address, role } = req.body;

  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await createUser({ name, email, password: hashedPassword, address, role });
  if (!userId) {
    throw new ApiError(400, "User cannot be created");
  }

  return res.status(201).json(new ApiResponse(201, { userId }, "User created successfully"));
});

const getUsers = asyncHandler(async (req, res) => {
  const { name, email, address, role, sortBy, order } = req.query;
  const users = await listUsers({ name, email, address, role, sortBy, order });
  return res.status(200).json(new ApiResponse(200, { users }, "Users retrieved successfully"));
});

const createStoreByAdmin = asyncHandler(async (req, res) => {
  const { name, email, address, owner_id } = req.body;

  const existingStore = await findStoreByEmail(email);
  if (existingStore) {
    throw new ApiError(400, "Store with this email already exists!");
  }

  const storeId = await createStore({ name, email, address, owner_id });
  if (!storeId) {
    throw new ApiError(400, "Store cannot be created");
  }

  return res.status(201).json(new ApiResponse(201, { storeId }, "Store created successfully"));
});

const getStores = asyncHandler(async (req, res) => {
  const { name, email, address, sortBy, order } = req.query;
  const stores = await listStores({ name, email, address, userId: null, sortBy, order });
  return res.status(200).json(new ApiResponse(200, { stores }, "Stores retrieved successfully"));
});

const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === "store_owner") {
    const store = await findStoreByOwnerId(userId);
    if (store) {
      user.averageRating = await getAverageRatingForStore(store.id);
    }
  }

  return res.status(200).json(new ApiResponse(200, { user }, "User details retrieved successfully"));
});

const getStoreDetails = asyncHandler(async (req, res) => {
  const storeId = req.params.id;
  const store = await findStoreById(storeId);
  if (!store) {
    throw new ApiError(404, "Store not found");
  }

  store.averageRating = await getAverageRatingForStore(storeId);

  return res.status(200).json(new ApiResponse(200, { store }, "Store details retrieved successfully"));
});

export { getDashBoardStats, createUserByAdmin, getUsers, createStoreByAdmin, getStores, getUserDetails, getStoreDetails };