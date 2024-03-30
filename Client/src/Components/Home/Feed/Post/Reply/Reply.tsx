import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { ReplyProps } from "../Post";
import { timeSince } from "../../../../Common/TimeUtils";

const heartVariants: Variants = {
  hover: {
    scale: 1.3,
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
  },
  tap: {
    scale: 0.4,
    transition: { duration: 0.1, type: "spring", stiffness: 100, damping: 0 },
  },
};

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
      className="pl-4 py-2 my-2 font-work-sans"
      variants={replyVariants}
      initial="hidden"
      animate="visible"
    >
      <hr className="border-t-2 border-muted-mint border-dashed w-3/4 mx-auto -mt-4 pt-2" />
      <div className="mb-1">
        <span className="font-semibold font-montserrat text-md">
          {displayName}
        </span>
        <span className="text-xs text-grey ml-2">{timeSince(timestamp)}</span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-luni-black flex-grow">{content}</p>
        <div className="flex-shrink-0 ml-4 self-end flex items-center pr-1">
          <motion.button
            type="button"
            onClick={handleLike}
            variants={heartVariants}
            whileHover="hover"
            whileTap="tap"
            className="focus:outline-none"
          >
            {isLiked ? (
              <HeartSolidIcon className="w-5 h-5 text-red" />
            ) : (
              <HeartOutlineIcon className="w-5 h-5 text-blue" />
            )}
          </motion.button>
          <span className="text-sm text-black ml-1">
            {likesCount + (isLiked ? 1 : 0)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Reply;
