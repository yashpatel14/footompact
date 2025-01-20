import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Landing } from "../models/landing.model.js";
import { Contact } from "../models/contact.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Blog } from "../models/blog.model.js";
import { Service } from "../models/service.model.js";

const insertLanding = asyncHandler(async (req, res) => {
    const { name, phone, email, message } = req.body;

    if (!name && !email && !phone && !message) {
        throw new ApiError(400, "name,email,phone and message is required");
    }

    const landing = await Landing.create({
        name,
        email,
        phone,
        message,
    });

    if (!landing) {
        throw new ApiError(500, "something went wrong data not inserted");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, landing, "your data submitted Successfully")
        );
});

const insertAppointment = asyncHandler(async (req, res) => {
    const { name, phone, email, message, issue } = req.body;

    if (!name && !email && !phone && !message && !Array.isArray(issue)) {
        throw new ApiError(
            400,
            "name,email,phone,issue and message is required"
        );
    }

    const appointment = await Appointment.create({
        name,
        email,
        phone,
        message,
        issue,
    });

    if (!appointment) {
        throw new ApiError(500, "something went wrong data not inserted");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                appointment,
                "your data submitted Successfully"
            )
        );
});

const insertContact = asyncHandler(async (req, res) => {
    const { name, phone, email, message, issue } = req.body;

    if (!name && !email && !phone && !message && !Array.isArray(issue)) {
        throw new ApiError(
            400,
            "name,email,phone,issue and message is required"
        );
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        message,
        issue,
    });

    if (!contact) {
        throw new ApiError(500, "something went wrong data not inserted");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, contact, "your data submitted Successfully")
        );
});

const frontGetAllBlog = asyncHandler(async(req,res)=>{
    const blog = await Blog.aggregate([
        {
            $match:{
                isPublished:true
            }
        },
        {
            $project: {
                title: 1,
                image: 1,
                description: 1,
                shortDesc: 1,
                auther: 1,
                isPublished: 1,
                
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, blog, "blogs fetched successfully"));
})

const frontGetBlogById = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;

    if(!isValidObjectId(blogId)){
        throw new ApiError(400,"blogId requred")
    }

    const blog = await Blog.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(blogId),
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, blog, "Blog details fetched successfully"));
})

const frontgetAllServices = asyncHandler(async(req,res)=>{
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
})

export { insertLanding, insertAppointment, insertContact,frontGetAllBlog,frontGetBlogById,frontgetAllServices };
