import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocietyCard from "../Societies/SocietyCard";
import ExpandedSocietyCard from "../Societies/ExpandedSocietyCard";
import { fetchRecommendedSocieties } from "../../api/societiesAPI";
import { useUserContext } from "../../UserContext";
import { Society } from "../../types/society";

const RecommendedSocietiesList: React.FC = () => {
  const [recommendedSocieties, setRecommendedSocieties] = useState<Society[]>(
    []
  );
  const [expandedSociety, setExpandedSociety] = useState<Society | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const token = localStorage.getItem("token");
          if (token) {
            const data = await fetchRecommendedSocieties(user.id, token);
            setRecommendedSocieties(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching recommended societies:", error);
      }
    };
    fetchData();
  }, [user]);

  const handleCardClick = (society: Society) => {
    setExpandedSociety(society);
  };

  const handleCloseExpandedCard = () => {
    setExpandedSociety(null);
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
    hidden: { x: 50, opacity: 0 },
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
    hidden: { x: 50, opacity: 0 },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.3 + 0.9,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="hidden w-64 lg:block">
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="xl:text-md text-sm font-semibold mb-4 text-center font-montserrat-alt underline underline-offset-8 decoration-muted-mint decoration-dashed"
          variants={headingVariants}
        >
          Suggested Societies
        </motion.h2>
        {recommendedSocieties.map((society, index) => (
          <motion.div
            key={society.id}
            className="mb-4 xl:w-52 xl:h-52 lg:w-36  lg:h-36 mx-auto"
            variants={cardVariants}
            custom={index}
          >
            <SocietyCard
              society={society}
              onClick={handleCardClick}
              onLeaveSociety={() => {}}
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
              onLeaveSociety={() => {}}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecommendedSocietiesList;
