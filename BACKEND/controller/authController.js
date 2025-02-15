import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookies } from "../utils/tok&cooki.js"


export const signup = async (req, res) => {

  try {

  const {name, email, password, age, gender, genderPreference} = req.body

  if(!name || !email || !password || !age || !gender || !genderPreference) return res.status(400).json({success: false, message: "All fields are required"})

  if(password.length < 6) return res.status(400).json({success: false, message: "Password must be at least 6 characters"})

  if(age < 18) return res.status(400).json({success: false, message: "You must be at least 18 years old"})

  const hashpass = await bcrypt.hash(password, 10)

  const newUser = new User({name, email, password: hashpass, age, gender, genderPreference})

  const payload = {_id:newUser._id}

  generateTokenAndSetCookies(payload, res)

  await newUser.save()

  return res.status(201).json({success:true, message: "User created", user: newUser})

  } catch (error) {
    console.log("error in signup")
    return res.status(500).json({success:false, message: error.message})
  }

}

export const login = async (req, res) => {

  try {
    
  const {email, password} = req.body

  if(!email || !password) return res.status(400).json({success: false, message: "All fields are required"})

  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({ message: "User not existing" });
  
  const isPassMatch = await bcrypt.compare(password, user.password);
  if (!isPassMatch) return res.status(400).json({success: false, message: "Invalid password"})

  const payload = {_id:user._id}

  generateTokenAndSetCookies(payload, res)

  return res.status(200).json({success:true, message: "User logged in", user: user})

  } catch (error) {
    console.log("error in login")
    return res.status(500).json({success:false, message: error.message})
  }

}

export const logout = async (req, res) => {
  try {
    return res.cookie("jwt","",{maxAge:0}).status(200).json({success:true,message:"logged out successfully"})
  } catch (error) {
    console.log("error in logout")
    return res.status(500).json({success:false, message: error.message})
  }
}

export const me = async (req, res) => {

  try {
    const userId = req.user._id
   
    const currUser = await User.findById(userId).select("-password")

    if(!currUser) return res.status(404).json({success:false, message: "User not found"})

    return res.status(200).json({success:true, user: currUser})

  } catch (error) {
    console.log("error in me")
    return res.status(500).json({success:false, message: error.message})
  }

}

