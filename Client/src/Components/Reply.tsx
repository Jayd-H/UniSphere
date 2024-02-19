import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { ReplyProps } from "./Post";
import { timeSince } from "./TimeUtils";

const Reply: React.FC<ReplyProps> = ({
  username,
  content,
  timestamp,
  likesCount,
}) => {
  // State to manage like status
  const [isLiked, setIsLiked] = useState(false);

  // Handle the like button click
  const handleLike = () => {
    setIsLiked(!isLiked);
    // BACKEND TODO: Update like status in the backend
  };

  // Animation variants
  const likeButtonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <div className="pl-4 pr-2 py-2 bg-luni-lighter-grey rounded-lg my-2">
      <div className="mb-1">
        <span className="font-semibold text-sm">{username}</span>
        <span className="text-xs text-luni-grey ml-2">
          {timeSince(timestamp)}
        </span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-luni-grey flex-grow">{content}</p>
        <div className="flex-shrink-0 ml-4 self-end flex items-center">
          <motion.button
            type="button"
            className="focus:outline-none"
            onClick={handleLike}
            variants={likeButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isLiked ? (
              <HeartSolidIcon className="w-4 h-4 text-red-500" />
            ) : (
              <HeartOutlineIcon className="w-4 h-4 text-luni-grey" />
            )}
          </motion.button>
          {/* Move the span outside of the motion.button but within the flex container to keep layout */}
          <span className="text-xs text-luni-grey ml-1">
            {likesCount + (isLiked ? 1 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reply;
