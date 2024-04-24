import React from "react";
import { motion } from "framer-motion";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <motion.p
      className="pt-2 pb-6 mr-2 text-dark-grey px-6 break-words"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {content}
    </motion.p>
  );
};

export default PostContent;
