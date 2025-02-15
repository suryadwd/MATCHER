import React, { useEffect } from 'react'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import ChatPage from './pages/ChatPage'
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

const App = () => {

  const {checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div className='absolute inset-0 -z-10 w-full h-full bg-[#E38E49] bg-[linear-gradient(to_right,#E38E49,transparent_1px),linear-gradient(to_bottom,#E38E49,transparent_1px)] bg-[size:6rem_3rem]'>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chat/:id" element={<ChatPage />} />
    </Routes>

    </div>
  )
}

export default App
