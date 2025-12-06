import express from "express"
import dotenv from "dotenv"
import connectTODB from "./database/index.js"
import axios from "axios"
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

