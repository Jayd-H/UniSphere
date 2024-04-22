import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocietyCard from "../Societies/SocietyCard";
import ExpandedSocietyCard from "../Societies/ExpandedSocietyCard";
import { Society } from "../../types/society";
import { leaveSociety } from "../../api/societiesAPI";
import { User } from "../../types/user";

interface HomeSocietiesListProps {
  societies: Society[];
  setSocieties: (societies: Society[]) => void;
  user: User;
}

const JoinedSocietiesList: React.FC<HomeSocietiesListProps> = ({
  societies,
  setSocieties,
  user,
}) => {
  const [expandedSociety, setExpandedSociety] = useState<Society | null>(null);

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
      }
    } catch (error) {
      console.error("Error leaving society:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.6,
      },
    },
  };

  const headingVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="hidden lg:block w-64">
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="xl:text-lg text-base font-semibold mb-4 text-center font-montserrat-alt underline underline-offset-8 decoration-muted-mint decoration-dashed"
          variants={headingVariants}
        >
          Joined Societies
        </motion.h2>
        {societies.map((society) => (
          <motion.div
            key={society.id}
            className="mb-4 xl:w-52 xl:h-52 lg:w-36  lg:h-36 mx-auto"
            variants={cardVariants}
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
      <AnimatePresence>
        {expandedSociety && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-black opacity-50"
              onClick={handleCloseExpandedCard}
            />
            <ExpandedSocietyCard
              society={expandedSociety}
              onClose={handleCloseExpandedCard}
              onLeaveSociety={handleLeaveSociety}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinedSocietiesList;
