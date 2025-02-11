import express from "express";
import { login, logout, me, signup } from "../controller/authController.js";
import { protect } from "../middleware/protect.js"
const route = express.Router();

route.post("/signup", signup)
route.post("/login", login)
route.get("/logout", logout)
route.get("/me", protect, me)


export default route