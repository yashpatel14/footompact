import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
    {
        title:{
            type:String,
            requred:true
        },
        description:{
            type:String,
            requred:true
        },
        image:{
            type:String,
            requred:true
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },{timestamps:true}
);

export const Service = mongoose.model("Service",serviceSchema); 