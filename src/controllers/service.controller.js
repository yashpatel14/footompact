import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Service } from "../models/service.model.js";
import {
    deleteMediaFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const getAllService = asyncHandler(async (req, res) => {
    const service = await Service.aggregate([
        {
            $project: {
                title: 1,
                description: 1,
                image: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, service, "service fetched successfully"));
});

const publishService = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title && !description) {
        throw new ApiError(400, "title and descrition are required");
    }

    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "imageLocalPath required");
    }

    const imageFile = await uploadOnCloudinary(imageLocalPath);

    if (!imageFile) {
        throw new ApiError(400, "image file not found");
    }

    const services = await Service.create({
        title,
        description,
        image: imageFile.url,
        isPublished: true,
    });

    const servicesUploaded = await Service.findById(services?._id);

    if (!servicesUploaded) {
        throw new ApiError(500, "service uploding failed please try again !!!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, services, "blog uploaded successfully"));
});

const getServiceById = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;

    if (!isValidObjectId(serviceId)) {
        throw new ApiError(400, "invalid serviceId");
    }

    if (!isValidObjectId(req.user?._id)) {
        throw new ApiError(400, "Invalid userId");
    }

    const service = await Service.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(serviceId),
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                service,
                "service details fetched successfully"
            )
        );
});

const updateService = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const { serviceId } = req.params;

    if (!isValidObjectId(serviceId)) {
        throw new ApiError(400, "serviceId requred");
    }

    if (!title && !description) {
        throw new ApiError(400, "title and description requred");
    }

    const service = await Service.findById(serviceId);

    if (!service) {
        throw new ApiError(404, "service not found");
    }

    const imageToDelete = service.image;
    const imageLocalPath = req.file?.path;

    let imageFile = null;
    if (imageLocalPath) {
        imageFile = await uploadOnCloudinary(imageLocalPath);
        if (!imageFile) {
            throw new ApiError(400, "Failed to upload new main image file");
        }
    }

    const serviceUpdate = await Service.findByIdAndUpdate(
        serviceId,
        {
            $set: {
                title,
                description,
                image: imageFile?.url || service.image,
            },
        },
        {
            new: true,
        }
    );

    if (!serviceUpdate) {
        throw new ApiError(500, "Failed to update service please try again");
    }

    if (imageFile && imageToDelete) {
        await deleteMediaFromCloudinary(imageToDelete);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, serviceUpdate, "Service updated successfully")
        );
});

const deleteService = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;

    if (!isValidObjectId(serviceId)) {
        throw new ApiError(400, "serviceId requred");
    }

    const service = await Service.findById(serviceId);

    if (!service) {
        throw new ApiError(404, "Service not found");
    }

    const deleteService = await Service.findByIdAndDelete(service?._id);

    if (!deleteService) {
        throw new ApiError(
            500,
            "Failed to delete the service please try again"
        );
    }

    await deleteMediaFromCloudinary(service.image);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "service deleted successfully"));
});

export {
    getAllService,
    publishService,
    getServiceById,
    updateService,
    deleteService,
};
