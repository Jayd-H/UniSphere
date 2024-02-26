import { useState } from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  CogIcon,
  ChevronRightIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import SidebarLink from "./SidebarLink";
import SidebarSeparator from "./SidebarSeparator";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkBaseClasses =
    "flex flex-col items-center justify-center py-2 transition-all duration-300 group";
  const activeLinkClasses = "text-blue-600";
  const inactiveLinkClasses = "text-gray-600 hover:text-luni-blue";
  const iconClasses = "h-8 w-8";

  const getNavLinkClasses = (isActive: boolean) =>
    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  const sidebarVariants = {
    open: { x: 0, width: "5rem", transition: { stiffness: 100 } },
    closed: { x: "-100%", transition: { stiffness: 100 } },
  };

  const notchVariants = {
    hover: {
      scale: 1.5,
      transition: { duration: 0.2, transformOrigin: "center" },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-screen bg-gray-100 text-gray-600 shadow-lg flex flex-col justify-between z-10"
      initial="open"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex flex-col items-center flex-1">
        <GlobeAltIcon className="h-10 w-10 text-gray-600 mt-6 mb-2" />
        <SidebarSeparator />
        <SidebarLink
          to="/home"
          icon={<HomeIcon className={iconClasses} />}
          label="Home"
          getNavLinkClasses={getNavLinkClasses}
        />
        <SidebarLink
          to="/societies"
          icon={<UserGroupIcon className={iconClasses} />}
          label="Societies"
          getNavLinkClasses={getNavLinkClasses}
        />
        <SidebarLink
          to="/events"
          icon={<CalendarIcon className={iconClasses} />}
          label="Events"
          getNavLinkClasses={getNavLinkClasses}
        />
      </div>
      <SidebarLink
        to="/settings"
        icon={<CogIcon className={iconClasses} />}
        label="Settings"
        getNavLinkClasses={getNavLinkClasses}
      />
      <motion.button
        className="absolute top-1/2 right-0 -mr-2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-l-full shadow-lg focus:outline-none"
        onClick={toggleSidebar}
        variants={notchVariants}
        initial={false}
        whileHover={isOpen ? undefined : "hover"}
      >
        <ChevronRightIcon
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;
