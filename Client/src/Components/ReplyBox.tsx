import React from "react";
import { motion } from "framer-motion";

// Define the type for the props
interface ReplyBoxProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ onSubmit }) => {
  return (
    <motion.div
      className="pl-4 py-2 bg-luni-lighter-grey my-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { ease: "easeOut", duration: 0.4 },
      }}
    >
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Write a reply..."
          className="w-full p-2 text-sm text-luni-black bg-white rounded-md border border-luni-light-grey focus:outline-none focus:border-luni-grey"
          name="replyContent"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-luni-blue text-white rounded-md hover:bg-luni-dark-blue focus:outline-none"
        >
          Reply
        </button>
      </form>
    </motion.div>
  );
};

export default ReplyBox;
