import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

const AuthPage = () => {

  const [isLogin, setIsLogin] = useState(true)


  return (
    <div className='min-h-screen flex items-center justify-center'>
     
     <div className='w-full max-w-md'>

      <h2 className='text-center text-3xl font-extrabold text-white mb-8'>
      {  isLogin ? "Sign in to MATCHER" : "Create a MATCHER account" }
      </h2>

      <div className='bg-white p-8 rounded-lg shadow-xl'>
      {isLogin ? <Login /> : <Signup />}

      <div className='mt-4 text-center'>
        <p className='text-sm text-gray-600'>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </p>

      <button onClick={() => setIsLogin((isLogin) => !isLogin)}
      className='mt-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300 ease-in-out'
      >
        {isLogin ? "Create an account" : "Login now"}
      </button>

      </div>

      </div>

     </div>

    </div>
  )
}

export default AuthPage
