import express from "express";
import {protect} from "../middleware/protect.js"
import { getMatches, getUsers, swipeLeft, swipeRight } from "../controller/matchController.js";
const route = express.Router();

route.post("/swipe-right/:likedUserId", protect, swipeRight)
route.post("/swipe-left/:dislikedUserId", protect, swipeLeft)
route.get("/", protect, getMatches)
route.get("/users", protect, getUsers)
export default route