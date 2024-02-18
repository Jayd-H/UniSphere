import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, UserGroupIcon, CalendarIcon, CogIcon, GlobeAltIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface NavLinkProps {
  isActive: boolean;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar loads in the open state
  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkBaseClasses = 'flex flex-col items-center justify-center py-2 transition-all duration-300 group';
  const activeLinkClasses = 'text-blue-600';
  const inactiveLinkClasses = 'text-gray-600 hover:text-luni-blue';
  const iconClasses = 'h-6 w-6';
  const labelClasses = 'text-xs mt-1';
  const separatorClasses = 'border-b border-gray-300 w-1/2 my-4';

  const getNavLinkClasses = ({ isActive }: NavLinkProps) => (
    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
  );

  // Define sidebar animation variants
  const sidebarVariants = {
    open: { x: 0, width: '4rem', transition: { stiffness: 100 } }, // Adjusted width
    closed: { x: '-100%', transition: { stiffness: 100 } },
  };

  // Define notch animation variants
  const notchVariants = {
    hover: { scale: 1.5, transition: { duration: 0.2, transformOrigin: 'center' } },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-screen bg-gray-100 text-gray-600 shadow-lg flex flex-col z-10"
      initial="open" // Start in the open state
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex flex-col items-center flex-1">
        <GlobeAltIcon className="h-8 w-8 text-gray-600 mt-4 mb-4" />
        <div className={separatorClasses}></div>
        <NavLink to="/home" className={({ isActive }) => getNavLinkClasses({ isActive })}>
          <HomeIcon className={iconClasses} />
          <span className={labelClasses}>Home</span>
        </NavLink>
        <NavLink to="/societies" className={({ isActive }) => getNavLinkClasses({ isActive })}>
          <UserGroupIcon className={iconClasses} />
          <span className={labelClasses}>Societies</span>
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => getNavLinkClasses({ isActive })}>
          <CalendarIcon className={iconClasses} />
          <span className={labelClasses}>Events</span>
        </NavLink>
      </div>
      <NavLink to="/settings" className={`${getNavLinkClasses({ isActive: false })} mb-2 self-center`}>
        <CogIcon className={iconClasses} />
        <span className={labelClasses}>Settings</span>
      </NavLink>
      <motion.button
        className="absolute top-1/2 right-0 -mr-2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-l-full shadow-lg focus:outline-none"
        onClick={toggleSidebar}
        variants={notchVariants}
        initial={false}
        whileHover={isOpen ? undefined : 'hover'}
      >
        <ChevronRightIcon className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;
