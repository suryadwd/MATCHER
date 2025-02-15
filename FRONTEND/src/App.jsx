import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(checkingAuth) return null

  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-[#E38E49] bg-[linear-gradient(to_right,#eaa874_1px,transparent_1px),linear-gradient(to_bottom,#eaa874_1px,transparent_1px)] bg-[size:6rem_3rem]">

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to={"/" }/>}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/chat/:id"
          element={authUser ? <ChatPage /> : <Navigate to={"/auth"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

//routes not working properly 2 14