import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/solid";
import { leaveSociety } from "../../api/societiesAPI";
import { useUserContext } from "../../UserContext";

interface SocietyProps {
  society: {
    id: number;
    societyName: string;
    description: string;
    imageURL: string;
  };
  onClick: (society: SocietyProps["society"]) => void;
  bin?: boolean;
  onLeaveSociety: (societyId: number) => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const popupVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const SocietyCard: React.FC<SocietyProps> = ({
  society,
  onClick,
  bin = false,
  onLeaveSociety,
}) => {
  const [isLeaveSocietyPopupOpen, setIsLeaveSocietyPopupOpen] = useState(false);
  const { user } = useUserContext();

  const handleLeaveSociety = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        await leaveSociety(society.id, user.id, token);
        onLeaveSociety(society.id);
        setIsLeaveSocietyPopupOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error leaving society:", error);
    }
  };

  const fontSize = society.societyName.length > 25 ? "text-sm" : "text-md";

  return (
    <motion.div
      className="relative cursor-pointer w-full h-64 border-[4px] border-dashed border-black rounded-lg font-montserrat shadow-md"
      whileHover={{ scale: isLeaveSocietyPopupOpen ? 1 : 1.05 }}
      whileTap={{ scale: isLeaveSocietyPopupOpen ? 1 : 0.95 }}
      onClick={() => {
        if (!isLeaveSocietyPopupOpen) {
          onClick(society);
        }
      }}
      variants={itemVariants}
    >
      <div className="w-full h-full rounded-md overflow-hidden">
        <img
          src={society.imageURL}
          alt={`Image of ${society.societyName}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-white text-xl font-bold">{society.societyName}</h3>
      </div>
      {bin && (
        <motion.div
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsLeaveSocietyPopupOpen(true);
          }}
        >
          <TrashIcon className="h-5 w-5 text-red" />
        </motion.div>
      )}
      <AnimatePresence>
        {isLeaveSocietyPopupOpen && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-between bg-white rounded-lg p-4"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <div className="flex-grow flex flex-col items-center justify-center">
              <h4
                className={
                  "font-bold text-lg font-montserrat-alt -mt-4 text-center mb-2"
                }
              >
                Leave Society
              </h4>
              <p className={`${fontSize} text-center mt-4`}>
                Are you sure you want to leave "{society.societyName}"?
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <motion.button
                className="bg-gray-200 text-black px-4 py-2 rounded-md font-semibold"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsLeaveSocietyPopupOpen(false)}
              >
                Cancel
              </motion.button>
              <motion.button
                className="bg-red text-white px-4 py-2 rounded-md font-semibold"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleLeaveSociety}
              >
                Leave
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SocietyCard;
