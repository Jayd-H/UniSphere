import { NavLink } from "react-router-dom";
import React, { ReactElement } from "react";

interface SidebarLinkProps {
  to: string;
  icon: ReactElement;
  label: string;
  getNavLinkClasses: (isActive: boolean) => string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, getNavLinkClasses }) => {
  return (
    <NavLink to={to} className={({ isActive }) => getNavLinkClasses(isActive)}>
      {icon}
      <span className="text-sm mt-1">{label}</span>
    </NavLink>
  );
};

export default SidebarLink;
