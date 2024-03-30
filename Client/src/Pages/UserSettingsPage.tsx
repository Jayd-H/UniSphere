import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import { PencilIcon } from "@heroicons/react/24/solid";
import SocietyCard from "../Components/Societies/SocietyCard";
import AlertMessage from "../Components/Common/AlertMessage";
import { useNavigate } from "react-router-dom";
import { mockUser } from "../Components/UserSettings/MockData";
import Popup from "../Components/Common/Popup";
import ExpandedSocietyCard from "../Components/Societies/ExpandedSocietyCard";

import { getPopupProps } from "../Components/Common/PopupProps";

interface SocietyData {
  id: number;
  societyName: string;
  description: string;
  imageURL: string;
}

const UserSettingsPage: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [societies, setSocieties] = useState<SocietyData[]>([]);
  const [popupType, setPopupType] = useState<string | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const navigate = useNavigate();

  const [expandedSociety, setExpandedSociety] = useState<SocietyData | null>(
    null
  );

  const handleCardClick = (society: SocietyData) => {
    setExpandedSociety(society);
  };

  const handleCloseExpandedCard = () => {
    setExpandedSociety(null);
  };

  // TODO: THIS IS A TERRIBLE WAY TO DO THIS, REPLACE WITH A FUNCTION THAT FETCHES SOCIETIES BY USER ID EVENTUALLY
  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const response = await fetch(
          "https://unispherebackend.vercel.app/api/societies/all"
        );
        const data = await response.json();
        if (data.success) {
          const userSocieties = data.data.filter((society: SocietyData) =>
            user.societies.includes(society.societyName)
          );
          setSocieties(userSocieties);
        } else {
          console.error("Failed to fetch societies:", data.message);
        }
      } catch (error) {
        console.error("Error fetching societies:", error);
      }
    };
    fetchSocieties();
  }, [user.societies]);

  const handleConfirm = (data: any) => {
    // TODO: Implement confirm logic based on popupType
    setPopupType(null);
    showAlert("Changes saved successfully", true);
  };

  const handleCancel = () => {
    setPopupType(null);
  };

  const handleLeaveSociety = (societyId: number) => {
    // TODO: Implement leave society logic
    setSocieties(societies.filter((society) => society.id !== societyId));
    showAlert(
      `Left ${
        societies.find((society) => society.id === societyId)?.societyName
      }`,
      true
    );
  };

  const showAlert = (message: string, isSuccess: boolean) => {
    setAlertMessage(message);
    setIsAlertSuccess(isSuccess);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
        type: spring,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2, type: spring } },
    tap: { scale: 0.7, transition: { duration: 0.2, type: spring } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2, type: spring } },
    tap: { scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="container mx-auto px-72 text-black font-montserrat"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-2xl font-bold text-center font-montserrat-alt mb-8"
        variants={childVariants}
      >
        User Settings
      </motion.h1>
      <motion.div className="mb-8" variants={childVariants}>
        <motion.h2
          className="text-2xl font-bold mb-3 font-montserrat-alt"
          variants={childVariants}
        >
          User Details
        </motion.h2>
        <motion.div className="flex items-center mb-2" variants={childVariants}>
          <span className="font-bold mr-2">Username:</span>
          <span>{user.username}</span>
          <motion.div
            className="h-5 w-5 ml-2 cursor-pointer"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setPopupType("username")}
          >
            <PencilIcon />
          </motion.div>
        </motion.div>
        <motion.div className="flex items-center mb-2" variants={childVariants}>
          <span className="font-bold mr-2">Display Name:</span>
          <span>{user.displayName}</span>
          <motion.div
            className="h-5 w-5 ml-2 cursor-pointer"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setPopupType("displayName")}
          >
            <PencilIcon />
          </motion.div>
        </motion.div>
        <motion.div className="mb-2" variants={childVariants}>
          <span className="font-bold mr-2">Societies:</span>
          <span>{user.societyCount}</span>
        </motion.div>
        <motion.div className="mb-2" variants={childVariants}>
          <span className="font-bold mr-2">Replies:</span>
          <span>{user.replyCount}</span>
        </motion.div>
        <motion.div className="mb-2" variants={childVariants}>
          <span className="font-bold mr-2">Posts:</span>
          <span>{user.regularPostCount}</span>
        </motion.div>
        <motion.div className="mb-2" variants={childVariants}>
          <span className="font-bold mr-2">Event Posts:</span>
          <span>{user.eventPostCount}</span>
        </motion.div>
        <motion.button
          className="bg-blue text-white px-4 py-2 rounded-md font-semibold mt-4"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setPopupType("password")}
        >
          Change Password
        </motion.button>
      </motion.div>
      <motion.div variants={childVariants}>
        <motion.h2 className="text-2xl font-bold mb-4" variants={childVariants}>
          Societies You Are In
        </motion.h2>
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
      </motion.div>
      <motion.div className="mt-8" variants={childVariants}>
        <motion.button
          className="bg-red text-white px-4 py-2 rounded-md font-semibold mr-4"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setPopupType("deleteAccount")}
        >
          Delete Account
        </motion.button>
        <motion.button
          className="bg-gray-200 text-black px-4 py-2 rounded-md font-semibold"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Request Data
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {popupType && (
          <Popup
            {...getPopupProps(
              popupType,
              handleConfirm,
              handleCancel,
              setPopupType
            )}
            onClose={() => setPopupType(null)}
          />
        )}
        {expandedSociety && (
          <ExpandedSocietyCard
            society={expandedSociety}
            onClose={handleCloseExpandedCard}
            userId={user.id}
          />
        )}
      </AnimatePresence>
      <AlertMessage
        message={alertMessage}
        isVisible={isAlertVisible}
        isSuccess={isAlertSuccess}
      />
    </motion.div>
  );
};

export default UserSettingsPage;
