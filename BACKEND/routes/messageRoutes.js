import express from "express";
import {protect} from "../middleware/protect.js"
import { getConverstion, sendMessage } from "../controller/messageController.js";
const route = express.Router();

route.use(protect)
route.post("/send", sendMessage)
route.get("/conversation/:userId", getConverstion)

export default route