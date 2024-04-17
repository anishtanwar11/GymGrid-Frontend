import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
  const navigate = useNavigate();
  const { userName } = useParams(); // Retrieve both userName and userId from URL parameters

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage editable fields
  const [editing, setEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [userImgPreview, setUserImgPreview] = useState(null);
  console.log(userName)

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const verifyResponse = await axios.get("https://gymgrid-backend.onrender.com/api/v1/user/verify");
        if (!verifyResponse.data.status) {
          navigate('/login');
          return;
        }

        const profileResponse = await axios.get(`https://gymgrid-backend.onrender.com/api/v1/user/profile/${userName}`);
        setUserData(profileResponse.data);
        setUpdatedUserData(profileResponse.data); // Initialize updatedUserData with current data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message); // Set error message
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, [userName]);

  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle file change for image input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserImg(e.target.files[0]); // Set selected image to state

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImgPreview(imageUrl) // Set image preview
    } else {
      setUserImgPreview(null)
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', updatedUserData.firstName);
      formData.append('lastName', updatedUserData.lastName);
      formData.append('userName', updatedUserData.userName);
      formData.append('email', updatedUserData.email);
      formData.append('userBio', updatedUserData.userBio);
      if (userImg) {
        formData.append('userImg', userImg); // Append user image to form data if selected
      }
      const response = await axios.put(`https://gymgrid-backend.onrender.com/api/v1/user/updateProfile/${userName}`, formData);
      setUserData(response.data); // Update userData with the response data
      setEditing(false); // Exit editing mode
      toast.success("Profile Updated!");
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError(error.message);
      toast.error("Failed to update profile!");
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return; // If the user cancels, exit the function

    try {
      const response = await axios.delete(`https://gymgrid-backend.onrender.com/api/v1/user/${userName}`);
      console.log(response);
      console.log(`https://gymgrid-backend.onrender.com/api/v1/user/${userName}`);
      toast.success("Profile Deleted Successfuly!");
      navigate('/'); // Redirect to home page on successful account deletion
      window.location.reload();
      setTimeout(() => {
        toast.success("Profile Deleted Successfuly!");
      }, 1000);
    } catch (error) {
      console.error("Error deleting user profile:", error);
      toast.error("Failed to delete profile!");
    }
  };

  // Function to cancel editing
  const handleCancel = () => {
    setUpdatedUserData(userData); // Reset updatedUserData to current data
    setEditing(false); // Exit editing mode
  };

  return (
    <div className='w-full flex flex-col  items-center bg-white sm:rounded-[20px]  sm:mr-4 sm:mb-4  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden'>
      <div className="overflow-y-auto p-4 pb-20 w-full h-full bg-white ">
        {userData && (
          <div className="">
            {editing ? (
              <>
                <form onSubmit={handleFormSubmit} className='py-8 gap-8 px-4 sm:px-8 md:px-16 rounded-[10px] max-w-[550px] bg-slate-100/90 mx-auto mb-2'>
                  <div className="mb-2 flex items-center justify-center relative">
                    {userImgPreview && (
                      <div className="w-[100px] h-[100px] overflow-hidden rounded-[50%] bg-slate-200 absolute top-0 z-[1]">
                        <img src={userImgPreview} alt="Preview" className="w-full" />
                      </div>
                    )}
                    <img src={userData.userImg} alt="user-dummy-img" className="w-[100px] h-[100px] rounded-[50%] absolute top-0 " />
                    <input type="file"
                      name="userImg"
                      id="userImg"
                      onChange={handleFileChange}
                      className="file:w-[100px] file:h-[100px] file:pb-8 file:border-none  file:text-white file:flex file:flex-col
                           w-[100px] h-[125px] text-slate-600 cursor-pointer file:border-2 file:rounded-[50%]" // Call handleFileChange on image file selection
                    />
                  </div>
                  <div className='flex flex-row gap-2 mt-6 w-full '>
                    <button type="submit" className='text-[16px] text-white font-medium py-2 px-4 rounded-md w-full bg-green-700'>Save</button>
                    <button type="button" onClick={handleCancel} className='text-[16px] text-white font-medium  py-2 px-4 rounded-md w-full bg-slate-400'>Cancel</button>
                  </div>
                </form>

                <form onSubmit={handleFormSubmit} className=' mb-4 py-8 gap-8 px-4 sm:px-8 md:px-16 rounded-[10px] max-w-[550px] bg-slate-100/90 mx-auto'>
                  <div className='flex gap-2 flex-col'>
                    <input type="text" name="firstName" value={updatedUserData.firstName} onChange={handleInputChange}
                      className='border-[1px] border-slate-600 py-2 px-4 rounded-md outline-none' />
                    <input type="text" name="lastName" value={updatedUserData.lastName} onChange={handleInputChange}
                      className='border-[1px] border-slate-600 py-2 px-4 rounded-md outline-none ' />
                    <input type="text" name="userName" value={updatedUserData.userName} onChange={handleInputChange}
                      className='border-[1px] border-slate-600 py-2 px-4 rounded-md outline-none  ' />
                    <input type="email" name="email" value={updatedUserData.email} onChange={handleInputChange}
                      className='border-[1px] border-slate-600 py-2 px-4 rounded-md outline-none  ' />
                    <textarea type="text" name="userBio" rows="4" value={updatedUserData.userBio} onChange={handleInputChange}
                      className='border-[1px] border-slate-600 py-2 px-4 rounded-md outline-none ' />

                    <div className='flex flex-row gap-2 mt-6 w-ful'>
                      <button type="submit" className='text-[16px] text-white font-medium py-2 px-4 rounded-md w-full bg-green-700'>Save</button>
                      <button type="button" onClick={handleCancel} className='text-[16px] text-white font-medium  py-2 px-4 rounded-md w-full bg-slate-400'>Cancel</button>
                    </div>
                  </div>
                </form>

                <form onSubmit={handleDeleteSubmit} className='flex flex-col py-8 gap-8 px-4 sm:px-8 md:px-16 rounded-[10px] max-w-[550px] bg-slate-100/90 mx-auto'>
                  <h1 className='text-center mb-2 text-[16px] font-medium'>If you want to delete your account then click on delete profile button</h1>
                  <button type="submit" className='text-[16px] text-white font-medium py-2 px-4 rounded-md  bg-red-700'>Delete Profile</button>
                </form>
              </>
            ) : (
              <div className='flex flex-col '>
                <div className='mx-auto'>
                  <div className=''>
                    <h1 className='text-[16px] sm:text-xl mb-4 '>👋 Welcome back! {userData.firstName} {userData.lastName}</h1>
                  </div>
                  <div className='flex flex-col md:flex-row gap-4'>
                    <div className=' flex md:flex-col sm:justify-center sm:flex-row flex-col sm:gap-x-4 gap-3 w-full  md:max-w-[250px]'>
                      <img src={userData.userImg} alt='user-image' className=' rounded-[10px] md:w-[250px] sm:w-1/2' />
                      <div className='sm:w-1/2 md:w-[250px] gap-y-4 sm:gap-y-4 flex flex-col justify-end'>
                        <div>
                          <h1 className='text-xl font-semibold'>{userData.firstName} {userData.lastName}</h1>
                          <p className='text-[1rem] font-normal text-slate-500'>{userData.userName}</p>
                          <p className='text-[1rem] font-normal text-slate-500'>{userData.email}</p>
                        </div>
                        <button onClick={() => setEditing(true)} className='sm:w-full bg-slate-200 rounded-md py-2 text-[16px] text-black font-medium'><i class="ri-pencil-line"></i> Edit profile</button>
                      </div>
                    </div>

                    <div className='border-[1px] border-slate-600/50 py-2 px-4 rounded-md'>
                      <h1 className='w-full border-b-[1px] border-slate-600/50 text-2xl font-semibold pb-2'>About Me:</h1>
                      <p className='text-[16px] font-normal mt-2 text-justify'>{userData.userBio}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
