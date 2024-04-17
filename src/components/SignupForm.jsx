import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { formSchema } from "../schemas";
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import OtpInput from 'react-otp-input';

const SignupForm = () => {
  const navigate = useNavigate();

  //PASSWORD VISIBILITY TOGGLE FUNCTION
  const [showPassword, setShowPassword] = useState(false);
  const [userImg, setUserImg] = useState(null); // State to store selected image

  const [userImgPreview, setUserImgPreview] = useState(null);

  const [showSignUpForm, setShowSignupForm] = useState(true);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpFeild, setShowOtpFeild] = useState(true);

  const toggle = () => {
    setShowPassword(!showPassword)
  }

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      console.log("Send OTP Clicked")
      const response = await axios.post("https://gymgrid-backend.onrender.com/api/v1/user/send-otp", { email });
      console.log(response.data);
      console.log("Send OTP Clicked")
      if (response.status === 200) {
        setShowOtpFeild(!showOtpFeild);
        console.log(response.status)
      }
      toast.success("OTP sent! check your email!")
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Email already in use!")
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://gymgrid-backend.onrender.com/api/v1/user/verify-otp", { otp });
      console.log(response.data);
      if (response.status === 200) {
        setShowSignupForm(!showSignUpForm);
      }
      console.log("Send OTP Clicked")
      toast.success("OTP Verifyed!")
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Invalid OTP")
    }
  }

  const handleOTPChange = (otpValue) => {
    setOtp(otpValue);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('userName', values.userName);
        formData.append('password', values.password);
        formData.append('confirm_password', values.confirm_password);
        formData.append('userImg', userImg); // Append the selected image to form data

        console.log("Clicked Login")
        const response = await axios.post("https://gymgrid-backend.onrender.com/api/v1/user/signup", formData, // Send form data including image
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Set content type for FormData
            }
          }
        );
        console.log("Run Login")
        console.log(response.data);
        formik.resetForm();
        toast.success("Signup successful! Please login to continue.");
        navigate("/login");
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error({ submit: "Unable to register!" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Function to handle file change for image input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file -", file.name);
    setUserImg(e.target.files[0]); // Set selected image to state

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("imageUrl", imageUrl)
      setUserImgPreview(imageUrl)
    } else {
      setUserImgPreview(null)
    }
  };

  return (
    <div className="w-full flex flex-col  items-center bg-white sm:rounded-[20px] sm:mr-4 sm:mb-4  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden">
      <div className="overflow-y-auto md:p-8 px-4 pt-8 w-full h-full bg-white">
        <div className=" py-8 md:px-16 px-8 rounded-[10px] bg-slate-100/90 max-w-[550px] mx-auto">

          <div className="w-full flex flex-col ">
            {showSignUpForm ? (
              showOtpFeild
                ? (<form onSubmit={handleSendOTP} className="">

                  <div className="w-full flex flex-col mb-2 items-center">
                    <h2 className="text-3xl font-semibold mb-2">Sign Up</h2>
                    <p className="text-base mb-2 text-center">Create an account with email verification</p>
                  </div>
                  <div className="input-block">
                    <input
                      type="email"
                      name="email"
                      required
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
                      focus:outline-none focus:border-black
                    focus:invalid:border-pink-500 peer"
                    />
                  </div>

                  <button className="mt-8 hover:bg-[#282828] duration-200 w-full text-white text-center font-semibold flex items-center justify-center bg-[#060606] rounded-[30px] p-4"
                    type="submit">Send OTP
                  </button>
                </form>
                ) : (<form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 items-center">
                  <OtpInput
                    name='otp'
                    id='otp'
                    value={otp}
                    onChange={handleOTPChange}
                    numInputs={6}
                    renderSeparator={<span>&nbsp; &nbsp;</span>}
                    renderInput={(props) => <input {...props} />}
                    className='w-[200px]'
                  />
                  <button className="hover:bg-[#282828] duration-200 w-full text-white text-center font-semibold flex items-center justify-center bg-[#060606] rounded-[30px] p-4"
                    type="submit">Verify OTP
                  </button>
                </form>
                )
            ) : (
              <form onSubmit={formik.handleSubmit}>
                {formik.errors.submit && (
                  <div className="font-semibold text-[13px] p-2 mt-[15px] text-red-500 border-2 border-red-400 border-dotted bg-red-100 pl-2 text-center rounded-[7px]">
                    {formik.errors.submit}
                  </div>
                )}

                <div className="mb-2 flex items-center justify-center relative ">
                  {userImgPreview && (
                    <div className="w-[100px] h-[100px] overflow-hidden rounded-[50%] bg-slate-200 absolute top-0 z-[1]">
                      <img src={userImgPreview} alt="Preview" className="" />
                    </div>
                  )}
                  <img src="https://klr.ac.in/wp-content/uploads/2015/11/dummy-user-1-200x200.jpg" alt="user-dummy-img"
                    className="w-[100px] h-[100px] rounded-[50%] absolute top-0 " />
                  <input type="file"
                    name="userImg"
                    id="userImg"
                    onChange={handleFileChange}
                    className="file:w-[100px] file:h-[100px] file:pb-8 file:border-none  file:text-white file:flex file:flex-col
                         w-[100px] h-[125px] text-slate-600 cursor-pointer file:border-2 file:rounded-[50%]" // Call handleFileChange on image file selection
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-x-4">
                  <div className="w-full">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
                         focus:outline-none focus:border-black
                       focus:invalid:border-pink-500"
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                      <p className="text-red-500 text-[13px] text-right font-normal">{formik.errors.firstName}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
                         focus:outline-none focus:border-black
                       focus:invalid:border-pink-500"
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                      <p className="text-red-500 text-[13px] text-right font-normal">{formik.errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="input-block">
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="User name"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
                     focus:outline-none focus:border-black
                   focus:invalid:border-pink-500"
                  />
                  {formik.errors.userName && formik.touched.userName && (
                    <p className="text-red-500 text-[13px] text-right font-normal">{formik.errors.userName}</p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-x-4">

                  <div className="w-full">
                    <div className="relative">
                      <input
                        type={(showPassword === false) ? "password" : "text"}
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
          focus:outline-none focus:border-black
        focus:invalid:border-pink-500 "
                      />
                      <div className="text-xl absolute top-3 right-0 cursor-pointer">
                        {
                          (showPassword === false) ? <AiFillEyeInvisible onClick={toggle} /> : <AiFillEye onClick={toggle} />
                        }
                      </div>
                    </div>
                    {formik.errors.password && formik.touched.password && (
                      <p className="text-red-500 text-[13px] text-right font-normal">{formik.errors.password}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <div className="relative">
                      <input
                        type={(showPassword === false) ? "password" : "text"}
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
                          focus:outline-none focus:border-black focus:invalid:border-pink-500"/>

                      <div className="text-xl absolute top-3 right-0 cursor-pointer">
                        {
                          (showPassword === false) ? <AiFillEyeInvisible onClick={toggle} /> : <AiFillEye onClick={toggle} />
                        }
                      </div>
                    </div>

                    {formik.errors.confirm_password && formik.touched.confirm_password && (
                      <p className="text-red-500 text-[13px] text-right font-normal">{formik.errors.confirm_password}</p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col my-6 gap-3">
                  <button
                    className="hover:bg-[#282828] duration-200 w-full text-white text-center font-semibold flex items-center justify-center bg-[#060606] rounded-[30px] p-4"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    Sign up
                  </button>

                  <Link to="/login">
                    <button className="flex items-center justify-center flex-wrap border-[1px] border-slate-500 w-full text-black text-center font-normal rounded-[30px] p-3">
                      Don't have account? &nbsp;{" "}
                      <span className="text-blue-500">Login</span>
                    </button>
                  </Link>
                </div>
              </form>
            )

            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
