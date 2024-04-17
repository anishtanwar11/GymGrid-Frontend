import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation() {

  const [navResizeToggle, setNavResizeToggle] = useState(false);
  const [navResize, setNavResze] = useState(false);

  const handleResizeClick = () => {
    setNavResze(!navResize);
  }

  const resizeButton = () => {
    setNavResizeToggle(!navResizeToggle);
  }

  return (
    <div className={`fixed bottom-0 w-full  left-0 right-0 sm:static   flex flex-col gap-4 sm:px-0 md:px-0 sm:py-2 sm:bg-slate-200 sm:h-screen sm:w-[65px] md:w-[260px] duration-500 ${navResize === true ? 'md:w-[65px] sm:w-[155px] px-[8px]' : ''}`}>
      <ul className="flex bg-slate-200 p-2   flex-row justify-between sm:flex-col font-semibold mt-14">
        <li className="">
          <NavLink to="/" className={` flex-col sm:flex-row items-center text-[13px]  py-1 px-2  nav-link sm:text-[1rem] flex sm:gap-2  text-Blcak sm:py-3 sm:px-4 rounded-md hover:bg-black hover:text-white duration-100 ${navResize === true ? '' : ''}`}>
            <i className="ri-home-4-line"></i>
            <div className={`md:block ${navResize === true ? 'sm:block md:hidden' : 'sm:hidden'}`}>
              Home
            </div>
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/dashboard" className={`flex-col sm:flex-row items-center text-[13px]  py-1 px-2 nav-link sm:text-[1rem] flex sm:gap-2  text-Blcak sm:py-3 sm:px-4 rounded-md hover:bg-black hover:text-white duration-100 ${navResize === true ? '' : ''}`}>
            <i className="ri-dashboard-line"></i>
            <div className={`md:block ${navResize === true ? 'sm:block md:hidden' : 'sm:hidden'}`}>
              Dashboard
            </div>
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/exercise" className={`flex-col sm:flex-row items-center text-[13px]  py-1 px-2 nav-link sm:text-[1rem] flex sm:gap-2  text-Blcak sm:py-3 sm:px-4 rounded-md hover:bg-black hover:text-white duration-100 ${navResize === true ? '' : ''}`}>
            <i class="ri-booklet-line"></i>
            <div className={`md:block ${navResize === true ? 'sm:block md:hidden' : 'sm:hidden'}`}>  Exercise</div>

          </NavLink>
        </li>
        <li className="">
          <NavLink to="/diets" className={`flex-col sm:flex-row items-center text-[13px]  py-1 px-2 nav-link sm:text-[1rem] flex sm:gap-2  text-Blcak sm:py-3 sm:px-4 rounded-md hover:bg-black hover:text-white duration-100 ${navResize === true ? '' : ''}`}>
            <i class="ri-sticky-note-line"></i>
            <div className={`md:block ${navResize === true ? 'sm:block md:hidden' : 'sm:hidden'}`}> Diets</div>

          </NavLink>
        </li>
        <li className="">
          <NavLink to="/my-goal" className={`flex-col sm:flex-row items-center text-[13px] py-1 px-2 nav-link sm:text-[1rem] flex sm:gap-2  text-Blcak sm:py-3 sm:px-4 rounded-md hover:bg-black hover:text-white duration-100 ${navResize === true ? '' : ''}`}>
            <i class="ri-focus-3-line"></i>
            <div className={` md:block ${navResize === true ? 'sm:block md:hidden' : 'sm:hidden'}`}> My Goal </div>

          </NavLink>
        </li>
      </ul>

      <div onClick={handleResizeClick} className={`hidden sm:block duration-500 absolute sm:left-[45px] md:left-[243px] sm:top-[90%] md:top-[50%] cursor-pointer bg-slate-400 h-[30px] w-[30px] rounded-[25px] z-[1] sm:flex items-center justify-center 
         ${ navResize === true ? "sm:left-[140px] md:left-[45px]" : ""} `}>
        {navResizeToggle
          ? <div className="text-3xl font-medium" onClick={resizeButton} > <i class="ri-arrow-drop-right-line" ></i> </div>
          : <div className="text-2xl font-medium" onClick={resizeButton}> <i class="ri-arrow-left-s-line "></i> </div>
        }
      </div>
    </div>
  );
}

export default Navigation;
