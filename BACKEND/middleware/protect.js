import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import { User } from "../models/user.model.js"

export const protect = async (req, res, next) => {
  
  try {
    
  const token = req.cookies.jwt

  if(!token) return res.status(401).json({success:false, message: "token not found"})
  
  const payload = jwt.verify(token, process.env.JWT_SECRET)

  if(!payload) return res.status(401).json({success:false, message:"payload not found"})

  const user = await User.findById(payload._id)

  if (!user) return res.status(401).json({ success:false, Message: "user not found" });

  req.user = user

  next()

  } catch (error) {
  console.log("Error in protect middleware", error.message);
  return res.status(500).json({ error: "Internal Server Error" });
}

}