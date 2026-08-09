import { asyncHandler } from "../utils/async-handler.utils.js";
import { ApiResponse } from "../utils/api-resolve.utils.js";
import { getRatersForStore, getAverageRatingForStore } from "../models/rating.model.js";
import { findStoreByOwnerId } from "../models/store.model.js";

const getOwnerDashboard = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;

  const store = await findStoreByOwnerId(ownerId);
  if (!store) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No store assigned to this owner"));
  }

  const raters = await getRatersForStore(store.id);
  const averageRating = await getAverageRatingForStore(store.id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { store: store.name, averageRating, raters },
        "Owner dashboard fetched successfully"
      )
    );
});

export { getOwnerDashboard };