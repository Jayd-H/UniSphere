import React, { useState } from "react";
import { motion, AnimatePresence, spring } from "framer-motion";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  changeUsername,
  changeDisplayName,
  changePassword,
} from "../../api/settingsAPI";
import UsernamePopup from "./Popups/UsernamePopup";
import DisplayNamePopup from "./Popups/DisplayNamePopup";
import PasswordPopup from "./Popups/PasswordPopup";
import { User } from "../../types/user";

interface UserDetailsProps {
  user: User;
  userDetails: {
    username: string;
    displayName: string;
    societyCount: number;
    replyCount: number;
    regularPostCount: number;
    eventReplyCount: number;
    eventPostCount: number;
  };
  showAlert: (message: string, isSuccess: boolean) => void;
  setUser: (user: User | null) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  userDetails,
  showAlert,
  setUser,
}) => {
  const [popupType, setPopupType] = useState<string | null>(null);

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.05 },
    }),
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2, type: spring } },
    tap: { scale: 0.7, transition: { duration: 0.2, type: spring } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2, type: spring } },
    tap: { scale: 0.9, transition: { duration: 0.2 } },
  };

  const handleConfirm = async (data: any) => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        switch (popupType) {
          case "username":
            await changeUsername(data.username, data.password, token);
            setUser({ ...user, userName: data.username });
            showAlert("Username changed successfully", true);
            break;
          case "displayName":
            await changeDisplayName(data.displayName, data.password, token);
            setUser({ ...user, displayName: data.displayName });
            showAlert("Display name changed successfully", true);
            break;
          case "password":
            await changePassword(data.currentPassword, data.newPassword, token);
            showAlert("Password changed successfully", true);
            break;
          default:
            break;
        }
        setPopupType(null);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      showAlert("Error updating settings", false);
    }
  };

  const handleCancel = () => {
    setPopupType(null);
  };

  return (
    <motion.div className="mb-8" variants={childVariants}>
      <motion.h2
        className="text-2xl font-bold mb-3 font-montserrat-alt"
        variants={childVariants}
        custom={0}
      >
        User Details
      </motion.h2>
      <motion.div
        className="flex items-center mb-2"
        variants={childVariants}
        custom={1}
      >
        <span className="font-bold mr-2">Username:</span>
        <span>{user.userName}</span>
        <motion.div
          className="h-5 w-5 ml-2 cursor-pointer"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setPopupType("username")}
          custom={2}
        >
          <PencilIcon />
        </motion.div>
      </motion.div>
      <motion.div
        className="flex items-center mb-2"
        variants={childVariants}
        custom={3}
      >
        <span className="font-bold mr-2">Display Name:</span>
        <span>{user.displayName}</span>
        <motion.div
          className="h-5 w-5 ml-2 cursor-pointer"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setPopupType("displayName")}
          custom={4}
        >
          <PencilIcon />
        </motion.div>
      </motion.div>
      <motion.div className="mb-2" variants={childVariants} custom={5}>
        <span className="font-bold mr-2">Societies:</span>
        <span>{userDetails.societyCount}</span>
      </motion.div>
      <motion.div className="mb-2" variants={childVariants} custom={6}>
        <span className="font-bold mr-2">Replies:</span>
        <span>{userDetails.replyCount}</span>
      </motion.div>
      <motion.div className="mb-2" variants={childVariants} custom={7}>
        <span className="font-bold mr-2">Event Replies:</span>
        <span>{userDetails.eventReplyCount}</span>
      </motion.div>
      <motion.div className="mb-2" variants={childVariants} custom={8}>
        <span className="font-bold mr-2">Posts:</span>
        <span>{userDetails.regularPostCount}</span>
      </motion.div>
      <motion.div className="mb-2" variants={childVariants} custom={9}>
        <span className="font-bold mr-2">Event Posts:</span>
        <span>{userDetails.eventPostCount}</span>
      </motion.div>
      <motion.button
        className="bg-blue text-white px-4 py-2 rounded-md font-semibold mt-4"
        custom={10}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => setPopupType("password")}
      >
        Change Password
      </motion.button>
      <AnimatePresence custom={11}>
        {popupType === "username" && (
          <UsernamePopup
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            user={user}
          />
        )}
        {popupType === "displayName" && (
          <DisplayNamePopup
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            user={user}
          />
        )}
        {popupType === "password" && (
          <PasswordPopup onConfirm={handleConfirm} onCancel={handleCancel} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserDetails;
