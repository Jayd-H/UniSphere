import React from "react";
import { motion } from "framer-motion";
import { timeSince } from "../../Common/TimeUtils";

interface SocietyPostHeaderProps {
  user: {
    id: number;
    displayName: string;
  };
  timestamp: string;
}

const SocietyPostHeader: React.FC<SocietyPostHeaderProps> = ({
  user,
  timestamp,
}) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <span className="font-semibold font-montserrat text-lg">
          {user.displayName}
        </span>
        <span className="text-sm text-grey ml-2">{timeSince(timestamp)}</span>
      </motion.div>
    </div>
  );
};

export default SocietyPostHeader;
