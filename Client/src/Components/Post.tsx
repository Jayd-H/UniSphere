import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Reply from "./Reply";
import { timeSince } from "./TimeUtils";
import ReplyBox from "./ReplyBox";

export interface ReplyProps {
  displayName: string;
  content: string;
  timestamp: string;
  likesCount: number;
  index: number;
}

export interface PostProps {
  displayName: string;
  societyName: string;
  timestamp: string;
  content: string;
  repliesCount: number;
  likesCount: number;
  replies: Array<ReplyProps>;
}

const handleReplySubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const replyContent = (
    event.currentTarget.elements.namedItem("replyContent") as HTMLInputElement
  ).value;
  // TODO Implement functionality to handle the reply submission
  console.log("Reply submitted: ", replyContent);
  (
    event.currentTarget.elements.namedItem("replyContent") as HTMLInputElement
  ).value = "";
};

const Post: React.FC<PostProps> = ({
  displayName,
  societyName,
  timestamp,
  content,
  repliesCount,
  likesCount,
  replies,
}) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleRepliesVisibility = () =>
    setAreRepliesVisible(!areRepliesVisible);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // BACKEND TODO: Send a request to the backend to update the like count
  };

  // Animation variants for the like button
  const likeButtonVariants = {
    hover: { scale: 1.2 },
    tap: { scale: 0.8 },
    liked: { scale: 1, color: "#ff0000" },
    unliked: { scale: 1, color: "#000000" },
  };

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.5, delay: 0.05 },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto my-6">
      {/* Post header */}
      <div className="flex justify-between items-center mb-3">
        {/* Post user info */}
        <div>
          <span className="font-semibold text-lg">{displayName}</span>
          <span className="text-sm text-luni-grey ml-2">
            {timeSince(timestamp)}
          </span>
        </div>
        {/* Society badge */}
        <span className="text-md font-bold mr-2 px-2.5 py-0.5 rounded bg-luni-blue text-white">
          {societyName}
        </span>
      </div>
      {/* Post content */}
      <p className="mb-3 mr-2 text-luni-black">{content}</p>
      {/* Post interactions */}
      <div className="flex justify-between items-center text-sm text-luni-grey">
        {/* Replies button */}
        <div className="flex items-center">
          <ChatBubbleLeftRightIcon className="w-6 h-6 mr-1" />
          <button
            type="button"
            className="flex items-center"
            onClick={toggleRepliesVisibility}
          >
            {areRepliesVisible ? (
              <ChevronUpIcon className="w-5 h-5 mr-1" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 mr-1" />
            )}
            <span>{repliesCount} Replies</span>
          </button>
        </div>
        {/* Like button */}
        <div className="flex items-center mr-0.5">
          <motion.button
            type="button"
            onClick={handleLike}
            variants={likeButtonVariants}
            whileHover="hover"
            whileTap="tap"
            className="focus:outline-none"
          >
            {isLiked ? (
              <HeartSolidIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartOutlineIcon className="w-6 h-6" />
            )}
          </motion.button>
          <span className="ml-1">{likesCount + (isLiked ? 1 : 0)}</span>
        </div>
      </div>
      {/* Replies */}
      <AnimatePresence>
        {areRepliesVisible && (
          <motion.div
            className="overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Reply box */}
            {/* TODO Replace "Username" with the actual display name */}
            <ReplyBox onSubmit={handleReplySubmit} displayName="Username" />
            {replies.map((reply, index) => (
              <Reply key={index} {...reply} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Post;
