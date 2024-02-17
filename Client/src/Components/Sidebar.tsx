import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, CalendarIcon, CogIcon } from '@heroicons/react/24/solid';
import UniSphereLogo from '../assets/UniSphereLogo.svg'; // Make sure the path is correct

const Sidebar = () => {
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => (
    `flex items-center justify-start w-full px-4 py-2 rounded-md text-xl font-bold 
    ${isActive ? 'text-luni-blue' : 'text-luni-grey'} hover:text-white hover:bg-luni-dark-blue`
  );

  const getNavLinkClassesSettings = ({ isActive }: { isActive: boolean }) => (
    `flex items-center justify-start w-full px-4 py-2 rounded-md text-md font-bold 
    ${isActive ? 'text-luni-blue' : 'text-luni-grey'} hover:text-white hover:bg-luni-dark-blue`
  );

  return (
    <div className="flex flex-col w-48 h-screen bg-luni-white py-5 text-center shadow-xl">
      <div className="flex-grow">
        <img src={UniSphereLogo} alt="UniSphere Logo" className="h-12 mb-20 mt-2 mx-auto w-40" />
        <NavLink to="/home" className={getNavLinkClasses}>
          <HomeIcon className="h-10 w-10 mx-2" />
          Home
        </NavLink>
        <NavLink to="/societies" className={getNavLinkClasses}>
          <UserGroupIcon className="h-10 w-10 mx-2" />
          Societies
        </NavLink>
        <NavLink to="/events" className={getNavLinkClasses}>
          <CalendarIcon className="h-10 w-10 mx-2" />
          Events
        </NavLink>
      </div>
      <NavLink to="/settings" className={getNavLinkClassesSettings}>
        <CogIcon className="h-6 w-6 mx-2" />
        <span>username</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
