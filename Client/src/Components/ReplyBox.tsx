import React, { useState } from "react";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface ReplyBoxProps {
  onSubmit: (content: string) => void;
  displayName: string;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ onSubmit, displayName }) => {
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (replyContent.trim()) {
      onSubmit(replyContent);
      setReplyContent("");
    }
  };

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
      <hr className="border-luni-lighter-grey w-3/4 mx-auto -mt-2 pt-2" />
      <div className="mb-1">
        <span className="font-semibold text-md">{displayName}</span>
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Write a reply..."
          className="w-full p-2 text-sm text-luni-black bg-luni-dark-grey rounded-md focus:outline-none focus:bg-white"
          name="replyContent"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
        {replyContent && (
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-luni-blue"
            aria-label="Send reply"
          >
            <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
          </button>
        )}
      </form>
    </motion.div>
  );
};

export default ReplyBox;
