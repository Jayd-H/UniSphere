import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Society } from "../../../types/Society";

interface SocietyDropdownProps {
  selectedSociety: number | null;
  societies: Society[];
  isOpen: boolean;
  setSelectedSociety: (societyId: number) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const SocietyDropdown: React.FC<SocietyDropdownProps> = ({
  selectedSociety,
  societies,
  isOpen,
  setSelectedSociety,
  setIsOpen,
}) => {
  const dropdownVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  const chevronVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const selectedSocietyName =
    societies.find((society) => society.id === selectedSociety)?.name || "";

  return (
    <motion.div className="relative">
      <motion.button
        className="flex items-center text-md font-bold mr-2 px-2.5 py-0.5 rounded bg-white border-2 border-dashed border-mint text-black"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedSocietyName || "Select Society"}
        <motion.div
          className="ml-1"
          variants={chevronVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute mt-2 py-2 w-full bg-white rounded-md shadow-xl z-20"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {societies.map((society) => (
              <motion.li
                key={society.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSociety(society.id);
                  setIsOpen(false);
                }}
                variants={itemVariants}
              >
                {society.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SocietyDropdown;
