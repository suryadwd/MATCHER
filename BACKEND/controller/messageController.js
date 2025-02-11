import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const {content, recieverId} = req.body

    const newMessage = await Message.create({content, sender: req.user._id, receiver: recieverId})

    res.status(200).json({success:true, message: newMessage})
  } catch (error) {
    console.log("error in sendMessage")
    return res.status(500).json({success:false, message: error.message})
  }
}

export const getConverstion = async (req, res) => {
  try {
    const { userId } = req.params
    const message = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ]
    }).sort("createdAt")

    res.status(200).json({success:true, message})

  } catch (error) {
    console.log("error in getConverstion")
    return res.status(500).json({success:false, message: error.message})
  }
}