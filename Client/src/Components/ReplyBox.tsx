import React from "react";
import { motion } from "framer-motion";

// Define the type for the props
interface ReplyBoxProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  displayName: string;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ onSubmit, displayName }) => {
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
      {/* Adding a header similar to a reply */}
      <hr className="border-luni-lighter-grey w-3/4 mx-auto -mt-2 pt-2" />
      <div className="mb-1">
        <span className="font-semibold text-md">{displayName}</span>
        {/* Optionally, you can add a static or dynamically generated timestamp here */}
        <span className="text-xs text-luni-grey ml-2">
          {/* Dynamic or static timestamp if needed */}
        </span>
      </div>
      <form onSubmit={onSubmit} className="flex justify-between">
        <input
          type="text"
          placeholder="Write a reply..."
          className="text-sm text-luni-black flex-grow mr-4 p-2 bg-white rounded-md border border-luni-light-grey focus:outline-none focus:border-luni-grey"
          name="replyContent"
        />
        <button
          type="submit"
          className="flex-shrink-0 ml-4 self-end bg-luni-blue text-white rounded-md px-4 py-2 hover:bg-luni-dark-blue focus:outline-none"
        >
          Reply
        </button>
      </form>
    </motion.div>
  );
};

export default ReplyBox;
