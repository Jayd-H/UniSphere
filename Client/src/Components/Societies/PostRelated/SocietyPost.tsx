import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SocietyReply from "./SocietyReply";
import SocietyPostHeader from "./SocietyPostHeader";
import SocietyPostContent from "./SocietyPostContent";
import SocietyPostActions from "./SocietyPostActions";
import { Post } from "../../../types/post";

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

const SocietyPost: React.FC<Post> = ({
  postId,
  user,
  timestamp,
  postContent,
  replyCount,
  likesCount,
  isLiked,
  replies,
}) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);

  const toggleRepliesVisibility = () =>
    setAreRepliesVisible(!areRepliesVisible);

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm shadow-mint max-w-2xl mx-auto my-6 font-work-sans"
      variants={postVariants}
      initial="hidden"
      animate="visible"
    >
      <SocietyPostHeader user={user} timestamp={timestamp} />
      <SocietyPostContent content={postContent} />
      <SocietyPostActions
        postId={postId}
        likesCount={likesCount}
        isLiked={isLiked}
        repliesCount={replyCount}
        areRepliesVisible={areRepliesVisible}
        toggleRepliesVisibility={toggleRepliesVisibility}
      />
      <AnimatePresence>
        {(areRepliesVisible || replyCount === 0) && (
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
                <SocietyReply key={reply.replyId} {...reply} index={index} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SocietyPost;
