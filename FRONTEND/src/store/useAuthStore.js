import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import  toast  from "react-hot-toast";




export const useAuthStore = create((set) => ({


  authUser: null,
  checkingAuth: true,
  loading: false,
  

  login: async (data) => {
    set({loading: true})
    try {
      const res = await axiosInstance.post("/auth/login", data)
      
      if(res.data.success){
      set({authUser: res.data.user})

      toast.success(res.data.message)
      }
    } catch (error) {
      toast.error("something went wrong")
      console.log("error in login",error)
    }finally{
      set({loading: false})
    }
  },


  logout: async () => {
    set({loading: true})
    try {
      
      const res = await axiosInstance.get("/auth/logout")
      if(res.data.success){
        set({authUser: null})
      toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(error.response.data.message||"something went wrong")
      console.log("error in signup",error)
    }finally{
      set({loading: false})
    }
  },

  signup: async (data) => {
    set({loading: true})
    try {
      const res = await axiosInstance.post("/auth/signup", data)
      set({authUser: res.data.user})
      console.log(authUser)
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message||"something went wrong")
      console.log("error in signup",error)
    }finally{
      set({loading: false})
    }
  },
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");

      if(res.data.success){
        set({ authUser: res?.data?.user }); 
      }

    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null }); 
    } finally {
      set({ checkingAuth: false });
    }
  },
}));