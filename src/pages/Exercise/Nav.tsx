import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  let {pathname} = useLocation();
  let subpage = pathname.split('/exercise')?.[1]
  // console.log(subpage);


  const Linkness = (link) => {
      if(subpage === ''){
          subpage = '/exercise/monday'
      }

      const isActive = link === subpage;
      return `hover:text-black duration-200 text-[#636262f0] font-semibold w-[100px] h-[50px] grid items-center justify-center cursor-pointer ${isActive ? 'border-b-2 border-gray-900 text-black' : ''}`;
  };

  return (
    <div className='w-full border-b-[1px] border-gray-400 px-4'>
        <ul className='flex flex-row gap-8'>
            <Link to={'/exercise'} className={Linkness('/exercise/monday')}>Monday</Link>
            <Link to={'/exercise/tuesday'} className={Linkness('/exercise/tuesday')} >Tuesday</Link>
            <Link to={'/exercise/wednesday'} className={Linkness('/exercise/wednesday')}>Wednesday</Link>
            <Link to={'/exercise/thursday'} className={Linkness('/exercise/thursday')}>Thursday</Link>
            <Link to={'/exercise/friday'} className={Linkness('/exercise/friday')}>Friday</Link>
            <Link to={'/exercise/satueday'} className={Linkness('/exercise/satueday')}>Saturday</Link>
        </ul>
    </div>
  )
}

export default Nav;
