import React from "react";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { likeEventPost, unlikeEventPost } from "../../../../api/eventsPostsAPI";

interface EventsPostActionsProps {
  postId: number;
  likesCount: number;
  isLiked: boolean;
  replyCount: number;
  areRepliesVisible: boolean;
  toggleRepliesVisibility: () => void;
  setIsLiked: (isLiked: boolean) => void;
}

const EventsPostActions: React.FC<EventsPostActionsProps> = ({
  likesCount,
  postId,
  isLiked,
  replyCount,
  areRepliesVisible,
  toggleRepliesVisibility,
  setIsLiked,
}) => {
  const [postLikesCount, setPostLikesCount] = React.useState(likesCount);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        if (isLiked) {
          await unlikeEventPost(postId, token);
          setPostLikesCount(postLikesCount - 1);
        } else {
          await likeEventPost(postId, token);
          setPostLikesCount(postLikesCount + 1);
        }
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  return (
    <div className="flex justify-between items-center text-sm text-blue">
      <motion.button
        type="button"
        className="flex items-center"
        onClick={toggleRepliesVisibility}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6 mr-1" />
        <motion.div
          animate={{ rotate: areRepliesVisible ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          <ChevronUpIcon className="w-5 h-5 mr-1" />
        </motion.div>
        <span>{replyCount} Replies</span>
      </motion.button>
      <div className="flex items-center mr-0.5">
        <motion.button
          type="button"
          onClick={handleLike}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.4 }}
          className="focus:outline-none"
        >
          {isLiked ? (
            <HeartSolidIcon className="w-6 h-6 text-red" />
          ) : (
            <HeartOutlineIcon className="w-6 h-6 text-blue" />
          )}
        </motion.button>
        {postLikesCount > 0 && (
          <span className="ml-1 text-black">{postLikesCount}</span>
        )}
      </div>
    </div>
  );
};

export default EventsPostActions;
