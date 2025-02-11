import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI)
  .then( () => console.log("DB CONNECTED") )
  .catch( (err) => console.log(err) )
}