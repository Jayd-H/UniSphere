import { useState, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Update isMobile state when window is resized
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar open/closed
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Sidebar open/closed variants
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 h-screen bg-gray-100 text-gray-600 shadow-lg z-10 ${
        isMobile ? "w-20" : "w-52"
      } flex flex-col justify-between font-montserrat`}
      initial={false}
      animate={isOpen || !isMobile ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex-1 flex flex-col">
        <div className={`${isMobile ? "" : "flex items-center"}`}>
          <GlobeAltIcon
            className={`h-10 w-10 ${
              isMobile ? "mx-auto my-4 mb-2" : "ml-4 mr-2 my-4"
            }`}
          />
          {!isMobile && (
            <span className="text-xl font-semibold">UniSphere</span>
          )}
        </div>
        <SidebarSeparator />
        {/* SidebarLink components */}
        <SidebarLink
          to="/home"
          icon={<HomeIcon />}
          label="Home"
          isMobile={isMobile}
        />
        <SidebarLink
          to="/societies"
          icon={<UserGroupIcon />}
          label="Societies"
          isMobile={isMobile}
        />
        <SidebarLink
          to="/events"
          icon={<CalendarIcon />}
          label="Events"
          isMobile={isMobile}
        />
      </div>
      <div className="mb-3">
        <SidebarLink
          to="/settings"
          icon={<CogIcon />}
          label="Settings"
          isMobile={isMobile}
        />
      </div>
      {isMobile && (
        <motion.button
          className="absolute top-1/2 right-0 -mr-2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-l-full shadow-lg focus:outline-none"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.5 }}
        >
          <ChevronRightIcon
            className={`h-5 w-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Sidebar;
