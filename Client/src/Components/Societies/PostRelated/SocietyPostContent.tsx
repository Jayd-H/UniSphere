import React from "react";
import { motion } from "framer-motion";

interface SocietyPostContentProps {
  content: string;
}

const SocietyPostContent: React.FC<SocietyPostContentProps> = ({ content }) => {
  return (
    <motion.p
      className="mb-3 mr-2 text-black"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {content}
    </motion.p>
  );
};

export default SocietyPostContent;
