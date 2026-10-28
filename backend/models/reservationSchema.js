import mongoose from "mongoose";
import { kMaxLength } from "node:buffer";
import { time } from "node:console";
import validator from "validator";

const reservationSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"first name must contain at least 3 characters "],
        maxLength:[30,"first name cannot exceed 30 characters"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"name must contain at least 3 characters"],
        maxLength:[30,"first name cannot exceed 30 characters"],
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail,"provide a valid email"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"phone number must be contain "],
        maxLength:[10,"phone number must be contain"],
    },
    time:{
        type:String,
        required: true,
    },
    date:{
        type:String,
        required: true,
    },
});

export const Reservation = mongoose.model("Reservation",reservationSchema);
