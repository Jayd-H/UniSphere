import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
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
      }
    } catch (error) {
      console.error("Error leaving society:", error);
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer w-full h-64 border-[4px] border-dashed border-black rounded-lg font-montserrat"
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
          onClick={() => setIsLeaveSocietyPopupOpen(true)}
        >
          <TrashIcon className="h-5 w-5 text-red" />
        </motion.div>
      )}
      {isLeaveSocietyPopupOpen && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-50"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h4 className="text-xl font-bold mb-4">
              Are you sure you want to leave {society.societyName}?
            </h4>
            <div className="flex justify-end">
              <button
                className="bg-blue text-white font-bold py-2 px-4 rounded-lg mr-2"
                onClick={() => setIsLeaveSocietyPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleLeaveSociety}
              >
                Leave
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SocietyCard;
