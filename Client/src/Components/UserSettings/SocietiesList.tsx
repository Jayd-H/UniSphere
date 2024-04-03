import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocietyCard from "../Societies/SocietyCard";
import ExpandedSocietyCard from "../Societies/ExpandedSocietyCard";
import { Society } from "../../types/society";
import { leaveSociety } from "../../api/societiesAPI";
import { NavLink } from "react-router-dom";
import { User } from "../../types/user";

interface SocietiesListProps {
  societies: Society[];
  setSocieties: (societies: Society[]) => void;
  showAlert: (message: string, isSuccess: boolean) => void;
  user: User;
}

const SocietiesList: React.FC<SocietiesListProps> = ({
  societies,
  setSocieties,
  showAlert,
  user,
}) => {
  const [expandedSociety, setExpandedSociety] = useState<Society | null>(null);

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.5 } },
  };

  const handleCardClick = (society: Society) => {
    setExpandedSociety(society);
  };

  const handleCloseExpandedCard = () => {
    setExpandedSociety(null);
  };

  const handleLeaveSociety = async (societyId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        await leaveSociety(societyId, user.id, token);
        setSocieties(societies.filter((society) => society.id !== societyId));
        showAlert(
          `Left ${
            societies.find((society) => society.id === societyId)?.societyName
          }`,
          true
        );
      }
    } catch (error) {
      console.error("Error leaving society:", error);
      showAlert("Error leaving society", false);
    }
  };

  return (
    <motion.div variants={childVariants}>
      <motion.h2 className="text-2xl font-bold mb-4" variants={childVariants}>
        Societies You Are In
      </motion.h2>
      {societies.length === 0 ? (
        <motion.div variants={childVariants}>
          <p className="text-lg mb-4">No societies joined.</p>
          <NavLink
            to="/societies"
            className="text-blue hover:underline font-semibold"
          >
            Browse Societies
          </NavLink>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={childVariants}
        >
          {societies.map((society) => (
            <motion.div
              key={society.id}
              className="relative"
              variants={childVariants}
            >
              <SocietyCard
                society={society}
                onClick={handleCardClick}
                bin={true}
                onLeaveSociety={() => handleLeaveSociety(society.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
      <AnimatePresence>
        {expandedSociety && (
          <ExpandedSocietyCard
            society={expandedSociety}
            onClose={handleCloseExpandedCard}
            onLeaveSociety={handleLeaveSociety}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SocietiesList;
