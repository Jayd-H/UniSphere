import React from "react";
import { motion, Variants } from "framer-motion";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { timeSince } from "../../../../Common/TimeUtils";
import {
  likeEventsReply,
  unlikeEventsReply,
} from "../../../../../api/eventsRepliesAPI";

interface EventsReplyProps {
  replyId: number;
  replyContent: string;
  timestamp: string;
  user: {
    id: number;
    displayName: string;
  };
  likesCount: number;
  isLiked: boolean;
  index: number;
}

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

const replyVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const EventsReply: React.FC<EventsReplyProps> = ({
  replyId,
  replyContent,
  timestamp,
  user,
  likesCount,
  isLiked,
  index,
}) => {
  const [replyIsLiked, setReplyIsLiked] = React.useState(isLiked);
  const [replyLikesCount, setReplyLikesCount] = React.useState(likesCount);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        if (replyIsLiked) {
          await unlikeEventsReply(replyId, token);
          setReplyLikesCount(replyLikesCount - 1);
        } else {
          await likeEventsReply(replyId, token);
          setReplyLikesCount(replyLikesCount + 1);
        }
        setReplyIsLiked(!replyIsLiked);
      }
    } catch (error) {
      console.error("Error liking/unliking event reply:", error);
    }
  };

  return (
    <motion.div
      className="pl-4 py-2 my-2 font-work-sans"
      variants={replyVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
    >
      <hr className="border-t-2 border-muted-mint border-dashed w-3/4 mx-auto -mt-4 pt-2" />
      <div className="mb-1">
        <span className="font-semibold font-montserrat text-md">
          {user.displayName}
        </span>
        <span className="text-xs text-grey ml-2">{timeSince(timestamp)}</span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-luni-black flex-grow">{replyContent}</p>
        <div className="flex-shrink-0 ml-4 self-end flex items-center pr-1">
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

export default EventsReply;
