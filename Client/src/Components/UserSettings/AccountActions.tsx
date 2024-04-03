import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, spring, AnimatePresence } from "framer-motion";
import { deleteAccount } from "../../api/settingsAPI";
import DeleteAccountPopup from "./Popups/DeleteAccountPopup";
import { User } from "../../types/user";
import { useUserContext } from "../../UserContext";

interface AccountActionsProps {
  showAlert: (message: string, isSuccess: boolean) => void;
  setUser: (user: User | null) => void;
}

const AccountActions: React.FC<AccountActionsProps> = ({
  showAlert,
  setUser,
}) => {
  const [popupType, setPopupType] = useState<string | null>(null);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.8 + i * 0.1 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2, type: spring } },
    tap: { scale: 0.9, transition: { duration: 0.2 } },
  };

  const handleConfirm = async (data: any) => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        if (popupType === "deleteAccount") {
          await deleteAccount(data.password, token);
          setUser(null);
          localStorage.removeItem("token");
          showAlert("Account deleted successfully", true);
          navigate("/login");
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
    <motion.div className="mt-8" variants={childVariants} custom={0}>
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
      <AnimatePresence>
        {popupType === "deleteAccount" && (
          <DeleteAccountPopup
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccountActions;
