import { User } from "../models/user.model.js";

export const swipeRight = async (req, res) => {
  try {
    const userId = req.user._id;
    const { likedUserId } = req.params;

    const currUser = await User.findById(userId);

    const likedUser = await User.findById(likedUserId);

    if(!currUser.likes.includes(likedUserId)){
      currUser.likes.push(likedUserId);
      await currUser.save();
    }    

    if(likedUser.likes.includes(likedUserId)){
      currUser.matches.push(likedUserId);
      likedUser.matches.push(currUser._id);
      
      await Promise.all([
        await currUser.save(),
      await likedUser.save()
      ])

    }

    res.status(200).json({
      success: true,
      user: currUser,
    });

  } catch (error) {
    console.log("error in swipeRight ");
    return res.status(401).json({ success: false, message: error.message });
  }

  

};

export const swipeLeft = async (req, res) => {
  try {
    const userId = req.user._id;

    const { dislikedUserId } = req.params;

    const currUser = await User.findById(userId);

    if (!currUser.dislikes.includes(dislikedUserId)) {
      currUser.dislikes.push(dislikedUserId);
      await currUser.save();
    }

    res.status(200).json({
      success: true,
      user: currUser,
    });
  } catch (error) {
    console.log("error in swipeLeft ");
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const getMatches = async (req, res) => {
  try {
    const userId = req.user._id;

    const currUser = await User.findById(userId).populate(
      "matches",
      "name image"
    );

    res.status(200).json({ success: true, matches: currUser.matches });
  } catch (error) {
    console.log("error in getMatch ");
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const currUser = await User.findById(userId);

    const users = await User.find({
      $and: [
        { _id: { $ne: userId } },
        { _id: { $nin: currUser.matches } },
        { _id: { $nin: currUser.dislikes } },
        { _id: { $nin: currUser.likes } },
        {
          gender:
            currUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currUser.genderPreference,
        },
        { genderPreference: { $in: [currUser.gender, "both"] } },
      ],
    });
  } catch (error) {
    console.log("error in getUsers ");
    return res.status(401).json({ success: false, message: error.message });
  }
};
