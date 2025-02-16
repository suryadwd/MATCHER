import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create( (set) => ({

    loading: false,

    updateProfile: async (data) => {
      try {
        set({loading: true})
         const res = await axiosInstance.post("/users/update", data)
         console.log(res)
        toast.success("Profile updated successfully")
      } catch (error) {
        toast.error(error.response.data.message||"something went wrong")
        console.log("error in updateProfile",error)
      }finally{
        set({loading: false})
      }

    }

}))