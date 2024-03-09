import React from "react";
import { motion } from "framer-motion";

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <motion.div
      className="frosted-glass w-full max-w-xs p-4 shadow-lg relative rounded-lg"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 35 }}
    >
      {children}
    </motion.div>
  );
};

export default FormContainer;
