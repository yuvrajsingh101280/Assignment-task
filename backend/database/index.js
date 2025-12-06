import mongoose, { connect } from "mongoose";

const connectTODB = async () => {
    try {
        const url = process.env.MONGO_URL
        await mongoose.connect(url)
        console.log("MongoDB is connected succcessfully")
    } catch (error) {
        console.log("Error in connecting mongo db:", error)
    }



}
export default connectTODB;