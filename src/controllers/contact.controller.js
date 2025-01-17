import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/contact.model.js";

const getAllContact = asyncHandler(async (req, res) => {
    const contact = await Contact.aggregate([
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                phone: 1,
                message: 1,
                issue: 1,
                createdAt: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, contact, "contact fetched successfully"));
});

const deleteContact = asyncHandler(async (req, res) => {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
        throw new ApiError(400, "contactId requred");
    }

    const contact = await Contact.findById(contactId);

    if (!contact) {
        throw new ApiError(404, "contact data not found");
    }

    const deleteContact = await Contact.findByIdAndDelete(contact?._id);

    if (!deleteContact) {
        throw ApiError(500, "Failed to delete the contact please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "contact deleted successfully"));
});

export { getAllContact, deleteContact };
