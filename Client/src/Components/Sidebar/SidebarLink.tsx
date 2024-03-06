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
  const iconClasses = "h-8 w-8";

  const getNavLinkClasses = (isActive: boolean) =>
    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  return (
    <NavLink to={to} className={({ isActive }) => getNavLinkClasses(isActive)}>
      <div
        className={`flex ${
          isMobile ? "flex-col items-center" : "items-center"
        }`}
      >
        <div className={`${iconClasses} ${isMobile ? "" : "mr-2"}`}>{icon}</div>
        <span className={`${isMobile ? "mt-1" : ""}`}>{label}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
