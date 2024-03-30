import React from "react";
import { motion } from "framer-motion";

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <motion.div
      className="bg-form-gradient border-2 border-black border-dotted shadow-lg w-full max-w-xs p-4 relative rounded-lg"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default FormContainer;
