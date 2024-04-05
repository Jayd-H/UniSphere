import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  CalendarIcon as CalendarIconSolid,
  CogIcon as CogIconSolid,
} from "@heroicons/react/24/solid";

const BottomDock: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full text-black flex items-center justify-around px-4 py-2 font-semibold font-montserrat bg-white z-40">
      <DockLink
        to="/home"
        label="Home"
        icon={HomeIcon}
        iconSolid={HomeIconSolid}
      />
      <DockLink
        to="/societies"
        label="Societies"
        icon={UserGroupIcon}
        iconSolid={UserGroupIconSolid}
      />
      <DockLink
        to="/events"
        label="Events"
        icon={CalendarIcon}
        iconSolid={CalendarIconSolid}
      />
      <DockLink
        to="/settings"
        label="Settings"
        icon={CogIcon}
        iconSolid={CogIconSolid}
      />
    </nav>
  );
};

interface DockLinkProps {
  to: string;
  label: string;
  icon: React.ElementType;
  iconSolid: React.ElementType;
}

const DockLink: React.FC<DockLinkProps> = ({
  to,
  label,
  icon: Icon,
  iconSolid: IconSolid,
}) => {
  const linkBaseClasses =
    "group transition-all duration-100 flex flex-col items-center";
  const activeLinkClasses = "text-blue";
  const inactiveLinkClasses = "text-black";

  const getNavLinkClasses = (isActive: boolean) =>
    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  return (
    <NavLink to={to} className={({ isActive }) => getNavLinkClasses(isActive)}>
      {({ isActive }) => (
        <>
          {isActive ? (
            <IconSolid className="h-6 w-6" />
          ) : (
            <Icon className="h-6 w-6" />
          )}
          <span className="text-xs">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default BottomDock;
