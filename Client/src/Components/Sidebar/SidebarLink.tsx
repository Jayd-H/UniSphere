import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactElement;
  label: string;
  isMobile: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  label,
  isMobile,
}) => {
  const linkBaseClasses = "group py-2 transition-all duration-300";
  const activeLinkClasses = "text-blue-600";
  const inactiveLinkClasses = "text-gray-600 hover:text-blue-500";
  const iconClasses = "h-6 w-6";

  const getNavLinkClasses = (isActive: boolean) =>
    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  return (
    <NavLink to={to} className={({ isActive }) => getNavLinkClasses(isActive)}>
      <div
        className={`flex items-center ${
          isMobile ? "flex-col" : "flex-row"
        } w-full`}
      >
        <div className={`${iconClasses} ${isMobile ? "mx-auto" : "ml-6"}`}>
          {icon}
        </div>
        <span className={`flex-1 text-left ${isMobile ? "mt-1" : "ml-6"}`}>
          {label}
        </span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
