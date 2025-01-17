import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Landing } from "../models/landing.model.js";
import { Contact } from "../models/contact.model.js";
import { Appointment } from "../models/appointment.model.js";


const dashboard = asyncHandler(async(req,res)=>{

    const totalLanding = await Landing.aggregate([
        {
            $group:{
                _id:null,
                landingCount:{
                    $sum:1
                }
            }
        }
    ])

    const totalAppointment = await Appointment.aggregate([
        {
            $group:{
                _id:null,
                appointmentCount:{
                    $sum:1
                }
            }
        }
    ])

    const totalContact = await Contact.aggregate([
        {
            $group:{
                _id:null,
                contactCount:{
                    $sum:1
                }
            }
        }
    ])

    const dashboard = {
    
        totalLanding: totalLanding[0]?.landingCount || 0,
        totalAppointment: totalAppointment[0]?.appointmentCount || 0,
        totalContact: totalContact[0]?.contactCount || 0
    };


    return res
    .status(200)
    .json(new ApiResponse(200,dashboard,"dashboard data fetched successfully"))
})


export {dashboard}