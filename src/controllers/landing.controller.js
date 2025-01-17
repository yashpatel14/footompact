import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Landing } from "../models/landing.model.js";

const getAllLanding = asyncHandler(async (req, res) => {
    const landing = await Landing.aggregate([
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                phone: 1,
                message: 1,
                createdAt: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, landing, "landing fetched successfully"));
});

const deleteLanding = asyncHandler(async (req, res) => {
    const { landingId } = req.params;

    if (!isValidObjectId(landingId)) {
        throw new ApiError(400, "landingId requred");
    }

    const landing = await Landing.findById(landingId);

    if (!landing) {
        throw new ApiError(404, "landing data not found");
    }

    const deleteLanding = await Landing.findByIdAndDelete(landing?._id);

    if (!deleteLanding) {
        throw new ApiError(
            500,
            "Failed to delete the landing please try again"
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Landing deleted successfully"));
});

export { getAllLanding, deleteLanding };
