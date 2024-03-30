import { NavLink } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -100]);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full text-black flex items-center justify-between px-8 py-4 font-semibold font-montserrat bg-white z-40"
      style={{ y }}
    >
      <div className="flex items-center">
        <NavLink to="/home">
          <span className="text-xl font-bold font-montserrat-alt">
            UNISPHERE
          </span>
        </NavLink>
      </div>
      <div className="flex items-center justify-end space-x-6 flex-grow">
        <div className="">
          <NavbarLink to="/home" label="Home" />
          <NavbarLink to="/societies" label="Societies" />
          <NavbarLink to="/events" label="Events" />
          <NavbarLink to="/settings" label="Settings" />
        </div>
      </div>
    </motion.nav>
  );
};

interface NavbarLinkProps {
  to: string;
  label: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ to, label }) => {
  const linkBaseClasses = "group transition-all duration-100";
  const activeLinkClasses =
    "text-black font-bold underline decoration-wavy decoration-blue";
  const inactiveLinkClasses =
    "text-black hover:underline decoration-wavy decoration-mint";

  const getNavLinkClasses = (isActive: boolean) =>
    `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${getNavLinkClasses(
          isActive
        )} px-4 py-2 rounded-md font-montserrat-alt whitespace-nowrap`
      }
    >
      {label}
    </NavLink>
  );
};

export default Navbar;
