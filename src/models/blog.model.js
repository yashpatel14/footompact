import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogSchema = new Schema({
    image:{
        type: String, //cloudinary url
            required: true
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    shortDesc: {
        type: String, 
        required: true
    },
    auther:{
        type:String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
},{timestamps:true})

blogSchema.plugin(mongooseAggregatePaginate)

export const Blog  = mongoose.model("Blog",blogSchema)