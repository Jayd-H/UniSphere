import React from "react";
import { motion } from "framer-motion";

interface GreetingHeaderProps {
  displayName: string;
}

const GreetingHeader: React.FC<GreetingHeaderProps> = ({ displayName }) => {
  return (
    <motion.div
      className="flex justify-center text-center font-montserrat"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1">
        <h1 className="text-2xl font-semibold font-montserrat-alt">
          Hey there
        </h1>
        <h1 className="text-xl -mt-3">{displayName}</h1>
        <div className="border-b-2 border-dashed border-muted-mint"></div>
      </div>
    </motion.div>
  );
};

export default GreetingHeader;
