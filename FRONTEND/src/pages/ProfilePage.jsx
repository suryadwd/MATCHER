import React from 'react'
import {useState} from "react";
import Header from '../components/Header'
import { useAuthStore } from '../store/useAuthStore'
import { useUserStore } from "../store/useUserStore";
import { useRef } from "react";


const ProfilePage = () => {


  const {authUser} = useAuthStore()
  const {updateProfile, loading} = useUserStore()


  const [data, setData] = useState({
    name: authUser.name || "",
    bio: authUser.bio || "",
    age: authUser.age || "",
    gender: authUser.gender || "",
    genderPreference: authUser.genderPreference || [],
    image: authUser.image || null
  })

  const fileInputRef = useRef(null)

  const  handleSubmit = async (e) => {
    e.preventDefault()
    updateProfile(data)
  }

  const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setData((prev) => ({ ...prev, image: reader.result }));
			};

			reader.readAsDataURL(file);
		}
	};


  return (
    <div className='min-h-screen bg-gray-50 flex flex-col '>
      <Header />

      <div className='flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Your Profile</h2>
				</div>

				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200'>
						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* NAME */}
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
									Name
								</label>
								<div className='mt-1'>
									<input
										id='name'
										name='name'
										type='text'
										required
										value={data.name}
										onChange={(e) => setData({ ...data, name: e.target.value})}
										className='appearance-none block w-full px-3 py-2 border border-gray-300
										 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 
										sm:text-sm'
									/>
								</div>
							</div>

							{/* AGE */}
							<div>
								<label htmlFor='age' className='block text-sm font-medium text-gray-700'>
									Age
								</label>
								<div className='mt-1'>
									<input
										id='age'
										name='age'
										type='number'
										required
										value={data.age}
										onChange={(e) => setData({ ...data, age: e.target.value})}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
									/>
								</div>
							</div>

							{/* GENDER */}
							<div>
								<span className='block text-sm font-medium text-gray-700 mb-2'>Gender</span>
								<div className='flex space-x-4'>
									{["Male", "Female"].map((option) => (
										<label key={option} className='inline-flex items-center'>
											<input
												type='radio'
												className='form-radio text-pink-600'
												name='gender'
												value={option.toLowerCase()}
												checked={data.gender === option.toLowerCase()}
                        onChange={() => setData({ ...data, gender: option.toLowerCase()})}
											/>
											<span className='ml-2'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* GENDER PREFERENCE */}
							<div>
								<span className='block text-sm font-medium text-gray-700 mb-2'>Gender Preference</span>
								<div className='flex space-x-4'>
									{["Male", "Female", "Both"].map((option) => (
										<label key={option} className='inline-flex items-center'>
											<input
												type='checkbox'
												className='form-checkbox text-pink-600'
												checked={data.genderPreference.toLowerCase() === option.toLowerCase()}
												onChange={() => setData({ ...data, genderPreference: option.toLowerCase()})}
											/>
											<span className='ml-2'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* BIO */}

							<div>
								<label htmlFor='bio' className='block text-sm font-medium text-gray-700'>
									Bio
								</label>
								<div className='mt-1'>
									<textarea
										id='bio'
										name='bio'
										rows={3}
										value={data.bio}
										onChange={(e) => setData({ ...data, bio: e.target.value})}
										className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>Cover Image</label>
								<div className='mt-1 flex items-center'>
									<button
										type='button'
										onClick={() => fileInputRef.current.click()}
										className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
									>
										Upload Image
									</button>
									<input
										ref={fileInputRef}
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handleImageChange}
									/>
								</div>
							</div>

							{data.image && (
								<div className='mt-4'>
									<img src={data.image} alt='User Image' className='w-48 h-full object-cover rounded-md' />
								</div>
							)}

							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 
								focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
								disabled={loading}
							>
								{loading ? "Saving..." : "Save"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;
