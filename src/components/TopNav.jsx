import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import LogoImg from '../assets/images/site-logo.png';
import axios from 'axios';

function TopNav() {
    const navigate = useNavigate();
    const { userName } = useParams();

    const [userData, setUserData] = useState(null);
    const [showSignIn, setShowSignIn] = useState(true);

    axios.defaults.withCredentials = true;
    const handleLogout = () => {
        axios.get('https://gymgrid-backend.onrender.com/api/v1/user/signout')
            .then(res => {
                if (res.data.status) {
                    navigate('/login')
                }
                window.location.reload();
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`https://gymgrid-backend.onrender.com/api/v1/user/profile/${userName}`)
                if (response.data.status !== false) {
                    setUserData(response.data)
                    setShowSignIn(!showSignIn)

                }

            } catch (error) {
                console.error("Error fetching user data in Navbar:", error);
            }
        }
        fetchUserData();
    }, [userName])
    return (
        <div className='w-full  bg-slate-200 flex flex-row justify-between px-4 sm:pl-8 sm:px-8 sm:pr-20 py-2 fixed top-0 left-0 z-[1]'>
            <div className="flex flex-row gap-2 place-items-center">
                <img src={LogoImg} alt="Gym Grid logo" className="w-10 h-10" />
                <h2 className="text-[#060606] font-semibold">Gym Grid</h2>
            </div>

            <ul className='flex gap-8 items-center justify-center'>
                {userData &&
                    <ul className='font-medium flex gap-4 sm:gap-8'>
                        <li>
                            <Link to={`/profile/${userData.userName}`} className='flex gap-2 items-center'>
                                <i class="ri-shield-user-line"></i> {userData.firstName}
                            </Link>
                        </li>
                        <li>
                            <NavLink to={'/login'} className="cursor-pointer" onClick={handleLogout}>
                                <i class="ri-logout-box-line"></i> Logout
                            </NavLink>
                        </li>
                    </ul>
                }
                {showSignIn &&
                    <li className='flex items-center gap-2 font-medium'>
                        <i class="ri-login-box-line"></i>
                        <Link to='/login'>Login</Link>
                    </li>
                }

            </ul>
        </div>
    );
}

export default TopNav;
