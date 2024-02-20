import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { ReplyProps } from "./Post";
import { timeSince } from "./TimeUtils";

const Reply: React.FC<ReplyProps> = ({
  displayName,
  content,
  timestamp,
  likesCount,
  index,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // implement functionality to persist like state
  };

  // Animation variants for each reply
  const replyVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.4,
        delay: index * 0.1, // Each reply will start animating 0.1 seconds after the previous one
      },
    },
  };

  return (
    <motion.div
      className="pl-4 py-2 bg-luni-lighter-grey my-2"
      variants={replyVariants}
      initial="hidden"
      animate="visible"
    >
      <hr className="border-luni-lighter-grey w-3/4 mx-auto -mt-2 pt-2" />
      <div className="mb-1">
        <span className="font-semibold text-md">{displayName}</span>
        <span className="text-xs text-luni-grey ml-2">
          {timeSince(timestamp)}
        </span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-luni-black flex-grow">{content}</p>
        <div className="flex-shrink-0 ml-4 self-end flex items-center pr-1">
          <motion.button
            type="button"
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none"
          >
            {isLiked ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartOutlineIcon className="w-5 h-5 text-luni-grey" />
            )}
          </motion.button>
          <span className="text-sm text-luni-grey ml-1">
            {likesCount + (isLiked ? 1 : 0)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Reply;
