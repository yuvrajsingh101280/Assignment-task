import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    name: {

        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlenght: [2, "Name must be at lease 2 characters"]

    },

    email: {


        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true

    },
    password: {

        type: String,
        required: [true, "Password is required"],
        minlenght: [6, "Password should be at least 6 characters"],
        select: false,

    }





}, { timestamps: true })


export const User = new mongoose.model("user", userSchema)