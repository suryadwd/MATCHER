import { User } from "../models/user.model.js";
import cloudinary from "../config/clouddb.js";


export const updateProfile = async (req, res) => {

  try {
    const userId = req.user._id;
  
    // const {name, age, gender, genderPreference, bio} = req.body

    const {image, ...otherData} = req.body
    
    let updateData = otherData


    if(image){
      if(image.startsWith("data:image")){
        
        try {
          const uploadResponse = await cloudinary.uploader.upload(image)
          updateData.image = uploadResponse.secure_url
        } catch (error) {
          console.log("error in image uplaosd in updateProfile")
          return res.status(401).json({success:false, message: error.message})
        }

      }
    }


    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true})

    res.status(200).json({success:true, user: updatedUser})

  } catch (error) {
    console.log("error in updateProfile")
    return res.status(500).json({success:false, message: error.message})
  }

}