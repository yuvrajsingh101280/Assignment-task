import express from "express"
import dotenv from "dotenv"
import connectTODB from "./database/index.js"
import axios from "axios"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import authRouter from "./router/authRouter.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
dotenv.config()
const app = express()

const port = process.env.PORT

// database
await connectTODB()
// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(morgan("dev"))


// router
app.use("/api/auth", authRouter)


app.get("/", (req, res) => {


    res.send("Api is working ")

})
// Error handling middleware
app.use(notFound)
app.use(errorHandler)
// for reseting the uptime
const url = "https://assignment-task-1.onrender.com"
const interval = 30000


function reloadWebsite() {
    axios
        .get(url)
        .then((res) => {
            console.log("Website reloaded");
        })
        .catch((err) => {
            console.log(`Error : ${err.message}`);
        });
}

setInterval(reloadWebsite, interval);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

