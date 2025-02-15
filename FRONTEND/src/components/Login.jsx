import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const {login} = useAuthStore()

  const onSubmit = (e) => {
    e.preventDefault();
    
    login(data)

  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
  
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>

          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            password
          </label>

          <div className="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center jsutify-between">
          <button
            type="submit"
            className="py-1 ml-[27%] px-14 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            SignUp
          </button>
        </div>
    
    </form>
  );
};

export default Login;
