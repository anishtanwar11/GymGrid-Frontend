// LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const LoginForm = () => {
    const navigate = useNavigate();

    //PASSWORD VISIBILITY TOGGLE FUNCTION
    const [showPassword, setShowPassword] = useState(false);

    const toggle = () => {
        setShowPassword(!showPassword)
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    axios.defaults.withCredentials = true;
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("https://gymgrid-backend.onrender.com/api/v1/user/login", formData);
            console.log("user data", response.data);
            const userName = response.data.userName;

            // console.log("username",userName);
            setFormData({
                email: "",
                password: "",
            });
            setError(null);
            navigate(`/profile/${userName}`);
            toast.success('Login Successfully')
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("Wrong User or Password!");
        }
        setLoading(false);
    };

    return (
        <div className="w-full flex flex-col  items-center bg-white sm:rounded-[20px] sm:mr-4 sm:mb-4  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden">
            <div className="overflow-y-auto px-4 pt-16 sm:p-8 w-full h-full bg-white ">
                <div className=" py-8 px-8 sm:px-16 rounded-[10px] bg-slate-100/90  max-w-[550px] mx-auto">
                    <div className="w-full flex flex-col mb-2 items-center">
                        <h2 className="text-3xl font-semibold mb-2">Login</h2>
                        <p className="text-base mb-2 text-center">👋 Welcome back! please enter your details</p>
                    </div>

                    <div className="w-full flex flex-col">
                        <form onSubmit={handleLogin}>

                            {error && (
                                <div className="font-semibold text-[13px] p-2 mt-[15px] text-red-500 border-2 border-red-400 border-dotted bg-red-100 pl-2 text-center rounded-[7px]">
                                    {error}
                                </div>
                            )}

                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
                            focus:outline-none focus:border-black
                            focus:invalid:border-pink-500 peer"/>

                            <div className="relative">
                                <input
                                    type={(showPassword === false) ? "password" : "text"}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full text-black my-2 py-2 bg-transparent border-b-2 border-black placeholder-slate-400 outline-none block text-sm shadow-sm 
                        focus:outline-none focus:border-black
                        focus:invalid:border-pink-500"
                                />
                                <div className="text-xl absolute top-3 right-0 cursor-pointer">
                                    {
                                        (showPassword === false) ? <AiFillEyeInvisible onClick={toggle} /> : <AiFillEye onClick={toggle} />
                                    }
                                </div>
                            </div>

                            <div className="flex flex-row text-blue-500 text-[13px] font-semibold gap-2">
                                <i class="ri-lock-unlock-line"></i>
                                <Link to='/forgotPassword'>Forgot Password?</Link>
                            </div>

                            <div className="w-full flex flex-col my-6 gap-3">
                                <button disabled={loading}
                                    className="hover:bg-[#282828] duration-200 w-full text-white text-center font-semibold flex items-center justify-center bg-[#060606] rounded-[30px] p-4"
                                    type="submit"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>

                                <Link to='/signup'>
                                    <button
                                        className="flex items-center justify-center flex-wrap border-[1px] border-slate-500 w-full text-black text-center font-normal rounded-[30px] p-3">
                                        Don't have account? &nbsp; <span className="text-blue-500">Sign up</span>
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
