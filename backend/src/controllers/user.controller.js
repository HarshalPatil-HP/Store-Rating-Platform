import { asyncHandler } from "../utils/async-handler.utils.js";
import { ApiError } from "../utils/api-error.utils.js";
import { ApiResponse } from "../utils/api-resolve.utils.js";
import { listStores } from "../models/store.model.js";
import { upsertRating } from "../models/rating.model.js";

const getStores = asyncHandler(async (req, res) => {
  const { name, address, sortBy, order } = req.query;
  const userId = req.user.id;
  const stores = await listStores({ name, address, sortBy, order, userId });

  return res
    .status(200)
    .json(new ApiResponse(200, stores, "Stores fetched successfully"));
});

const submitRating = asyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  await upsertRating({ user_id: userId, store_id: storeId, rating });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Rating submitted successfully"));
});

export { getStores, submitRating };