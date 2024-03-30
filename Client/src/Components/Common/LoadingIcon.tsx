import React from "react";
import { motion } from "framer-motion";

const LoadingIcon: React.FC = () => {
  const iconVariants = {
    animate: {
      rotate: [0, 180, 360],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="w-12 h-12 bg-blue rounded-full flex justify-center items-center"
      variants={iconVariants}
      animate="animate"
    >
      <div className="w-6 h-6 bg-white rounded-full" />
    </motion.div>
  );
};

export default LoadingIcon;
