import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Please provide a valid email",
            ],
        },
        phone:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        issue:{
            type:[String],
            required:true
        }
    },{timestamps:true}
);

export const Appointment = mongoose.model("Appointment",appointmentSchema);