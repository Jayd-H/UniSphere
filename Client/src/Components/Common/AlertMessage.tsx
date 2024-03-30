import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlertMessageProps {
  message: string;
  isVisible: boolean;
  isSuccess: boolean;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  isVisible,
  isSuccess,
}) => {
  const alertVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const bgColor = isSuccess ? "bg-green-500" : "bg-red";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 left-0 right-0 mx-auto ${bgColor} text-white px-4 py-2 text-md rounded-md font-semibold font-montserrat-alt shadow-lg z-50 max-w-max`}
          variants={alertVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertMessage;
