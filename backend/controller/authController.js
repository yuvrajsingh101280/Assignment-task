import { User } from "../models/userModel.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import bcrypt from "bcryptjs"
import axios from "axios"

export const singup = async (req, res) => {
    try {
        const { email, name, password } = req.body
        // validation
        if (!email || !name || !password) {

            return res.status(400).json({ sucess: false, message: "All field required" })



        }
        // check user if alreayd exist

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "User already exist" })

        }

        // check the valid email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {

            return res.status(400).json({ success: false, message: "Invalid email" })

        }
        // check the password
        if (password.length < 6) {

            return res.status(400).json({ success: false, message: "Password should have a minimum 6 charater length" })

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({ name, email, password: hashedPassword })
        generateTokenAndSetCookie(newUser._id, res)

        //  Trigger n8n workflow 
        try {
            await axios.post(process.env.N8N_WEBHOOK_URL, {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt,
            });
        } catch (err) {
            console.error("n8n webhook error:", err.message);
        }


        res.status(200).json({ success: true, message: "User created Successfully", user: { ...newUser._doc, password: undefined } })
    } catch (error) {
        console.log(error)

        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {

            return res.status(400).json({ success: false, message: "All fields are required" })

        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {

            return res.status(400).json({ success: false, message: "Invalid email" })

        }
        // check the password
        if (password.length < 6) {

            return res.status(400).json({ success: false, message: "Password should have a minimum 6 charater length" })

        }
        const user = await User.findOne({ email }).select("+password")
        if (!user) {


            return res.status(200).json({ success: false, message: "User not found" })

        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {

            return res.status(400).json({ success: false, message: "Invalid credentials" });


        }


        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            success: true, message: "User logged in ...............", user: {

                ...user._doc, password: undefined


            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
export const logout = async (req, res) => {


    try {
        res.clearCookie("token")

        return res.status(200).json({ success: true, message: "Logged out" })

    } catch (error) {


        return res.status(500).json({ success: false, message: "Logged out unsuccessfull" })

    }
}
export const getUserData = async (req, res) => {



    try {
        const user = req.user
        if (!user) {
            logger.warn("User not found in request")
            return res.status(400).json({ success: false, message: "User not found" })

        }

        return res.status(200).json({ success: true, user })
    } catch (error) {

        res.status(500).json({ success: false, message: "Internal server error" })
    }



}