import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteMediaFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

const getAllBlogs = asyncHandler(async (req, res) => {
    const blog = await Blog.aggregate([
        {
            $project: {
                title: 1,
                "image.url": 1,
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
});

const publishABlog = asyncHandler(async (req, res) => {
    const { title, description,shortDesc,auther } = req.body;

    if ([title, description, shortDesc,auther].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "imageLocalPath is requred");
    }

    

    const imageFile = await uploadOnCloudinary(imageLocalPath);
    

    if (!imageFile) {
        throw new ApiError(400, "image file not found");
    }

    

    const blog = await Blog.create({
        title,
        description,
        shortDesc,
        image: imageFile.url, // Save only the URL
        auther,
        isPublished: true,
    });

    const blogUploaded = await Blog.findById(blog._id);

    if (!blogUploaded) {
        throw new ApiError(500, "blog Upload failed please try again !!!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, blog, "blog uploaded successfully"));
});

const getBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, "invalid blogId");
    }

    if (!isValidObjectId(req.user?._id)) {
        throw new ApiError(400, "Invalid userId");
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
});

const updateBlog = asyncHandler(async (req, res) => {
    const { title, description,shortDesc,auther } = req.body;
    const { blogId } = req.params;

    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, "Invalid blogId");
    }

    if (!(title && description && shortDesc && auther)) {
        throw new ApiError(400, "title,description and category are required");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new ApiError(404, "Blog not Found");
    }

    

    const imageToDelete = blog.image;

    const imageLocalPath = req.file?.path;

    let imageFile = null;
    if (imageLocalPath) {
        imageFile = await uploadOnCloudinary(imageLocalPath);
        if (!imageFile) {
            throw new ApiError(400, "Failed to upload new main image file");
        }
    }

    

    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $set: {
                title,
                description,
                shortDesc,
                auther,
                image: imageFile?.url || blog.image,
            },
        },
        { new: true }
    );

    if (!updatedBlog) {
        throw new ApiError(500, "Failed to update Blog please try again");
    }

    

    if (imageFile && imageToDelete) {
        await deleteMediaFromCloudinary(imageToDelete);
    }

    

    return res
        .status(200)
        .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    //TODO: delete blog

    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, "Invalid blogId");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new ApiError(404, "No blog found");
    }

    

    const blogDeleted = await Blog.findByIdAndDelete(blog?._id);

    if (!blogDeleted) {
        throw new ApiError(400, "Failed to delete the blog please try again");
    }

    await deleteMediaFromCloudinary(blog.image);
    

    

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "blog deleted successfully"));
});

export { getAllBlogs, publishABlog, getBlogById, updateBlog, deleteBlog };
