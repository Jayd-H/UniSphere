import React from "react";
import { motion } from "framer-motion";
import { User } from "../../../../types/user";
import { timeSince } from "../../../Common/TimeUtils";

interface PostHeaderProps {
  user: User;
  timestamp: string;
  societyName: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  user,
  timestamp,
  societyName,
}) => {
  return (
    <div className="md:flex md:justify-between items-center mb-3 px-6 py-3 bg-light-grey border-b-2 border-dashed text-md border-muted-mint text-black rounded-t-lg">
      <div className="flex flex-col items-center md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center md:text-left"
        >
          <span className="text-lg font-montserrat">{user.displayName}</span>
          <span className="text-sm text-grey ml-2">{timeSince(timestamp)}</span>
        </motion.div>
      </div>
      <div className="flex justify-center mt-2 md:mt-0">
        <motion.button
          className="px-2.5 py-0.5 rounded-md font-montserrat border-2 border-blue font-medium  border-dashed text-black"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {societyName}
        </motion.button>
      </div>
    </div>
  );
};

export default PostHeader;
