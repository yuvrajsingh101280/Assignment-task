import express from "express"
import { getUserData, login, logout, singup } from "../controller/authController.js"
import { protectRotue } from "../middleware/authMiddleware.js"
const router = express.Router()

router.post("/signup", singup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/user", protectRotue, getUserData)
export default router