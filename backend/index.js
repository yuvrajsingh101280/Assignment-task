import express from "express"
import dotenv from "dotenv"
import connectTODB from "./database/index.js"
dotenv.config()
const app = express()

const port = process.env.PORT

// database
await connectTODB()
// middleware
app.use(express.json())


// router
app.get("/", (req, res) => {


    res.send("Api is working ")

})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

