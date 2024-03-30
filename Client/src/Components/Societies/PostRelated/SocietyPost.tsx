import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import SocietyReply, { SocietyReplyProps } from "./SocietyReply";
import { timeSince } from "../../Common/TimeUtils";

export interface SocietyPostProps {
  displayName: string;
  timestamp: string;
  content: string;
  repliesCount: number;
  likesCount: number;
  replies: Array<SocietyReplyProps>;
}

const postVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const nameVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

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

const SocietyPost: React.FC<SocietyPostProps> = ({
  displayName,
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
    // TODO: Send a request to the backend to update the like count
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm shadow-mint max-w-2xl mx-auto my-6 font-work-sans"
      variants={postVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-3">
        <motion.div variants={nameVariants}>
          <span className="font-semibold font-montserrat text-lg">
            {displayName}
          </span>
          <span className="text-sm text-grey ml-2">{timeSince(timestamp)}</span>
        </motion.div>
      </div>
      <motion.p className="mb-3 mr-2 text-black" variants={contentVariants}>
        {content}
      </motion.p>
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
          <span>{repliesCount} Replies</span>
        </motion.button>
        <div className="flex items-center mr-0.5">
          <motion.button
            type="button"
            onClick={handleLike}
            variants={heartVariants}
            whileHover="hover"
            whileTap="tap"
            className="focus:outline-none"
          >
            {isLiked ? (
              <HeartSolidIcon className="w-6 h-6 text-red" />
            ) : (
              <HeartOutlineIcon className="w-6 h-6 text-blue" />
            )}
          </motion.button>
          <span className="ml-1 text-black">
            {likesCount + (isLiked ? 1 : 0)}
          </span>{" "}
          {/* TODO DELETE THIS LINE WHEN WE GET LIKES INTEGRATED */}
        </div>
      </div>
      <AnimatePresence>
        {(areRepliesVisible || repliesCount === 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            exit={{ opacity: 0, height: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  staggerChildren: 0.1,
                },
              }}
              exit={{ opacity: 0, y: -40 }}
            >
              {replies.map((reply, index) => (
                <SocietyReply key={index} {...reply} index={index} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SocietyPost;
