// UserLoginLogout.jsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import LoginImg from '../assets/images/login-form-img.jpg';
import SiteLogo from '../assets/images/site-logo.png';

function UserLoginLogout({ setIsLoggedIn }) {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm);
    }

    // Handle login logic and set isLoggedIn state to true when the user logs in successfully
    const handleLogin = (authToken) => {
        // Set authentication state to true
        setIsLoggedIn(true);
        // Store authentication token in localStorage
        localStorage.setItem('authToken', authToken);
    };

    return (
        <div className='w-full h-screen flex items-start bg-white rounded-[20px]  mr-4 mb-4 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
            <div className='relative w-1/2 h-full flex flex-col overflow-hidden'>
                <div className='absolute top-[35%] left-[10%] flex flex-col'>
                    <h1 className='text-4xl font-bold text-white my-4'>Turn Your Fitness Dream into Reality</h1>
                    <p className='text-xl text-white font-normal'>start for free and get attractive offers from the community</p>
                </div>
                <img src={LoginImg} alt="Login-Logout-img" className='w-full h-full object-cover'/>
            </div>   

            <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
                <div className='flex flex-row items-center'>
                    <img src={SiteLogo} alt="Site-Logo" className='w-10 h-10' />
                    <h1 className='w-full max-w-[500] mx-auto mr-auto text-xl text-[#060606] font-semibold'>GYM GRID</h1>
                </div>

                {showLoginForm ? <LoginForm onLogin={handleLogin} /> : <SignupForm />}
                
                <div className='w-full flex items-center justify-center relative py-2'>
                    <div className='w-full h-[1px] bg-black'></div>
                    <p className='absolute text-lg text-black/80 bg-[#f5f5f5] px-2'>or</p>
                </div>

                <div className='w-full flex items-center justify-center'>
                    <p className='text-center font-normal text-[#060606]'>
                        { showLoginForm ? "Don't have a account?" : "Already have an account?"} &nbsp;
                        <span className='font-semibold underline underline-offset-1 cursor-pointer' onClick={toggleForm}> 
                            {showLoginForm ? "Sign up" : "Login"}
                        </span>
                    </p>
                </div>
            </div> 
        </div>
    )
}

export default UserLoginLogout;
