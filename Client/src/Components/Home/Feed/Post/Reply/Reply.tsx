import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { timeSince } from "../../../../Common/TimeUtils";
import { likeReply, unlikeReply } from "../../../../../api/repliesAPI";
import { Reply as ReplyType } from "../../../../../types/reply";

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

const Reply: React.FC<ReplyType & { index: number }> = ({
  replyId,
  replyContent,
  timestamp,
  index,
  likesCount,
  isLiked,
  user,
}) => {
  const [replyIsLiked, setReplyIsLiked] = useState(isLiked);
  const [replyLikesCount, setReplyLikesCount] = useState(likesCount);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        if (replyIsLiked) {
          await unlikeReply(replyId, token);
          setReplyLikesCount(replyLikesCount - 1);
          setReplyIsLiked(false);
        } else {
          await likeReply(replyId, token);
          setReplyLikesCount(replyLikesCount + 1);
          setReplyIsLiked(true);
        }
      }
    } catch (error) {
      console.error("Error liking/unliking reply:", error);
    }
  };

  const replyVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.4,
        delay: index * 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        ease: "easeIn",
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="pl-4 py-2 font-work-sans"
      variants={replyVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <hr className="border-t-2 pt-2 border-muted-mint border-dashed mx-auto" />
      <div className="mb-1">
        <span className=" font-montserrat font-medium text-base">
          {user.displayName}
        </span>
        <span className="text-xs text-grey ml-2">{timeSince(timestamp)}</span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-dark-grey flex-grow">{replyContent}</p>
        <div className="ml-4 flex items-center pr-2  -mt-6">
          <motion.button
            type="button"
            onClick={handleLike}
            variants={heartVariants}
            whileHover="hover"
            whileTap="tap"
            className="focus:outline-none"
          >
            {replyIsLiked ? (
              <HeartSolidIcon className="w-5 h-5 text-red" />
            ) : (
              <HeartOutlineIcon className="w-5 h-5 text-blue" />
            )}
          </motion.button>
          {replyLikesCount > 0 && (
            <span className="text-sm text-black ml-1">{replyLikesCount}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Reply;
