import express from "express";
import { protect } from "../middleware/protect.js";
import { updateProfile } from "../controller/userController.js";

const route = express.Router();

route.post("/update",protect, updateProfile)

export default route