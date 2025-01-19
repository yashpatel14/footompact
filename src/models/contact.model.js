import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Please provide a valid email",
            ],
        },
        message:{
            type:String,
            required:true
        },
        issue:{
            type:String,
            required:true
        }
    },{timestamps:true}
);

export const Contact = mongoose.model("Contact",contactSchema);