import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({})
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("https://gymgrid-backend.onrender.com/api/v1/user/forgot-Password", {
      email,
    }).then(response => {
      if (response.data.status) {
        setError("");
        toast.success("Check your email for reset password link!");
        navigate('/login');
        console.log('link sent')
      }
    }).catch(error => {
      console.error("Error signing up:", error);
      toast.error("User not exist, enter right email!");
    })
  };
  return (
    <div className="w-full flex flex-col  items-center bg-white rounded-[20px] mr-4 mb-4  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden">
      <div className="overflow-y-scroll p-8 w-full h-full bg-white ">
        <div className="py-8 px-16 rounded-[10px] bg-slate-100/90  max-w-[550px] mx-auto">
          <div className="w-full flex flex-col mb-2">
            <h2 className="text-3xl font-semibold mb-2">Forgot Password</h2>

          </div>

          <div className="w-full flex flex-col">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="font-semibold text-[13px] p-2 mt-[15px] text-red-500 border-2 border-red-400 border-dotted bg-red-100 pl-2 text-center rounded-[7px]">
                  {error}
                </div>
              )}

              <label className="block">
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
              focus:outline-none focus:border-black
             focus:invalid:border-pink-500 peer"/>
                {/* <p class="mt-0 hidden  peer-invalid:block text-pink-600 font-semibold text-right text-[12px]">
              Please provide a valid email address.
            </p> */}
              </label>

              <div className="w-full flex flex-col my-4">
                <button
                  className="hover:bg-[#282828] duration-200 w-full text-white text-center font-semibold flex items-center justify-center bg-[#060606] rounded-[30px] p-4"
                  type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
