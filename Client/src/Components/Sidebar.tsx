import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, CalendarIcon, CogIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
  const linkBaseClasses = 'flex items-center justify-start w-full px-4 py-3 rounded-md text-xl font-bold transition-all duration-300 group';
  const activeLinkClasses = 'relative before:content-[""] before:absolute before:left-1/2 before:right-1/2 before:bottom-0 before:h-[2px] before:bg-white before:transition-all before:duration-300';
  const inactiveLinkClasses = 'text-white group-hover:before:content-[""] group-hover:before:absolute group-hover:before:left-1/2 group-hover:before:right-1/2 group-hover:before:bottom-0 group-hover:before:h-[2px] group-hover:before:bg-white group-hover:before:scale-x-0 group-hover:before:transition-all group-hover:before:duration-300 group-hover:before:origin-center';
  const settingsLinkClasses = 'text-md py-2';
  const shadowClasses = 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]';

  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => (
    `${linkBaseClasses} ${shadowClasses} ${isActive ? activeLinkClasses + ' before:left-0 before:right-0' : inactiveLinkClasses}`
  );

  const getSettingsLinkClasses = ({ isActive }: { isActive: boolean }) => (
    `${linkBaseClasses} ${settingsLinkClasses} ${shadowClasses} ${isActive ? activeLinkClasses + ' before:left-0 before:right-0' : inactiveLinkClasses}`
  );

  return (
    <div className="w-48 h-screen bg-gradient-to-b from-luni-light-blue to-luni-blue text-center shadow-xl">
      <div className="flex flex-col justify-between h-full">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-white p-4 drop-shadow-md">UniSphere</h1>
          <div className="mx-auto w-3/4 h-[1px] bg-white/50 mb-6"></div> {/* Separator line */}
          <NavLink to="/home" className={getNavLinkClasses}>
            <HomeIcon className={`h-8 w-8 mr-2 ${shadowClasses}`} />
            Home
          </NavLink>
          <NavLink to="/societies" className={getNavLinkClasses}>
            <UserGroupIcon className={`h-8 w-8 mr-2 ${shadowClasses}`} />
            Societies
          </NavLink>
          <NavLink to="/events" className={getNavLinkClasses}>
            <CalendarIcon className={`h-8 w-8 mr-2 ${shadowClasses}`} />
            Events
          </NavLink>
        </div>
        <NavLink to="/settings" className={getSettingsLinkClasses}>
          <CogIcon className={`h-6 w-6 mr-2 ${shadowClasses}`} />
          <span className={shadowClasses}>username</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
