import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    age: "",
    genderPreference: "",
  });

  const { signup, loading } = useAuthStore()

  const Submit = async(e) => {
    e.preventDefault()
    signup(data)
  }

  return (
    <form onSubmit={Submit}>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          name
        </label>

        <div className="mt-1">
          <input
            type="name"
            name="name"
            id="name"
            autoComplete="name"
            required
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          email
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
          htmlFor="email"
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

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          age
        </label>

        <div className="mt-1">
          <input
            type="age"
            name="age"
            id="age"
            autoComplete="age"
            required
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Gender</label>
      <div className="mt-2 flex gap-2">

      <div className="flex items-center">
        <input
         type="checkbox"
         id="male" 
         value="male"
         name="gender"
         checked = {data.gender === "male"}
         onChange={(e) => setData({ ...data, gender: e.target.value })}
         className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
         />
         <label htmlFor="male" className="ml-2 block text-sm text-gray-900">Male</label>
      </div>

      <div className="flex items-center">
        <input
         type="checkbox"
         id="female" 
         name="gender"
         value="female"
         checked = {data.gender === "female"}
         onChange={(e) => setData({ ...data, gender: e.target.value })}
         className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
         />
         <label htmlFor="female" className="ml-2 block text-sm text-gray-900">Female</label>
      </div>    
      </div>
    </div>

    <div>
				<label className='block text-sm font-medium text-gray-700'>Prefer Gender</label>
				<div className='mt-2 space-y-2'>
					<div className='flex items-center'>
						<input
							id='prefer-male'
							name='gender-preference'
							type='radio'
							value='male'
							checked={data.genderPreference === "male"}
              onChange={(e) => setData({ ...data, genderPreference: e.target.value })}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300'
						/>
						<label htmlFor='prefer-male' className='ml-2 block text-sm text-gray-900'>
							Male
						</label>
					</div>
					<div className='flex items-center'>
						<input
							id='prefer-female'
							name='gender-preference'
							type='radio'
							value='female'
							checked={data.genderPreference === "female"}
							onChange={(e) => setData({ ...data, genderPreference: e.target.value })}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300'
						/>
						<label htmlFor='prefer-female' className='ml-2 block text-sm text-gray-900'>
							Female
						</label>
					</div>
					<div className='flex items-center'>
						<input
							id='prefer-both'
							name='gender-preference'
							type='radio'
							value='both'
							checked={data.genderPreference === "both"}
							onChange={(e) => setData({ ...data, genderPreference: e.target.value })}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300'
						/>
						<label htmlFor='prefer-both' className='ml-2 block text-sm text-gray-900'>
							Both
						</label>
					</div>
				</div>
			</div>

    <button type="submit" className="px-7 py-1 bg-blue-500 text-white rounded-lg ml-[34%] mt-4">{ (loading) ? "Loading..." : "Sign in"}</button>

    </form>
  );
};

export default Signup;
