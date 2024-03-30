import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/solid";
import LeaveSocietyPopup from "../UserSettings/LeaveSocietyPopup";

interface SocietyProps {
  society: {
    id: number;
    societyName: string;
    description: string;
    imageURL: string;
  };
  onClick: (society: SocietyProps["society"]) => void;
  bin?: boolean;
  onLeaveSociety: (societyName: string) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const SocietyCard: React.FC<SocietyProps> = ({
  society,
  onClick,
  bin = false,
  onLeaveSociety,
}) => {
  const [isLeaveSocietyPopupOpen, setIsLeaveSocietyPopupOpen] = useState(false);

  const handleLeaveSociety = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsLeaveSocietyPopupOpen(true);
  };

  const handleConfirmLeaveSociety = async () => {
    try {
      // TODO: Call the actual backend function to leave the society
      await leaveSocietyBackendFunction(society.id);
      onLeaveSociety(society.societyName);
      setIsLeaveSocietyPopupOpen(false);
    } catch (error) {
      console.error("Error leaving society:", error);
    }
  };

  // Placeholder backend function
  const leaveSocietyBackendFunction = async (societyId: number) => {
    // TODO: Implement the actual backend logic to leave the society
    console.log(
      `Backend function called to leave society with ID: ${societyId}`
    );
    // Simulating an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
          onClick={handleLeaveSociety}
        >
          <TrashIcon className="h-5 w-5 text-red" />
        </motion.div>
      )}
      {isLeaveSocietyPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <LeaveSocietyPopup
            societyName={society.societyName}
            onConfirm={handleConfirmLeaveSociety}
            onCancel={() => setIsLeaveSocietyPopupOpen(false)}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SocietyCard;
