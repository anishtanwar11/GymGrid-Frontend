import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const { token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("https://gymgrid-backend.onrender.com/api/v1/user/reset-Password/" + token, {
      password,
    }).then(response => {
      if (response.data.status) {
        setError("");
        toast.success("Password chaged successfully!")
        navigate('/login');
      }
      console.log(response.data)
    }).catch(error => {
      console.error("Error reset password:", error);
      setError("enter right email!");
    })
  };
  return (
    <div className="w-full flex flex-col  items-center bg-white rounded-[20px] mr-4 mb-4  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden">
      <div className="overflow-y-scroll p-8 w-full h-full bg-white ">
        <div className="py-8 px-16 rounded-[10px] bg-slate-100/90  max-w-[550px] mx-auto">
          <div className="w-full flex flex-col mb-2">
            <h2 className="text-3xl font-semibold mb-2">Reset Password</h2>
          </div>

          <div className="w-full flex flex-col">
            <form onSubmit={handleSubmit}>

              <label>New Password</label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
            focus:outline-none focus:border-black
          focus:invalid:border-pink-500"/>

              {error && <div style={{ color: "red" }}>{error}</div>}
              <div className="w-full flex flex-col my-4">
                <button
                  className="hover:bg-[#282828] duration-200 w-full text-white text-center font-semibold flex items-center justify-center bg-[#060606] rounded-md p-4"
                  type="submit">
                  Reset
                </button>
              </div>
            </form>
            <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
