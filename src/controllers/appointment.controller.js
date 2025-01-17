import mongoose, { isValidObjectId } from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";

const getAllAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.aggregate([
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
        .json(
            new ApiResponse(
                200,
                appointment,
                "appointment fetched successfully"
            )
        );
});

const deleteAppointment = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;

    if (!isValidObjectId(appointmentId)) {
        throw new ApiError(400, "appointmentId requred");
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        throw new ApiError(404, "appointment not found");
    }

    const deleteAppointment = await Appointment.findByIdAndDelete(
        appointment?._id
    );

    if (!deleteAppointment) {
        throw new ApiError(
            500,
            "Failed to delete the appointment please try again"
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "appointment deleted successfully"));
});

export { getAllAppointment, deleteAppointment };
