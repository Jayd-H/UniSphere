import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import autosize from "autosize";

interface ReplyBoxProps {
  onSubmit: (content: string) => void;
  loggedInDisplayName: string;
  maxCharacters: number;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({
  onSubmit,
  loggedInDisplayName,
  maxCharacters,
}) => {
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (replyContent.trim()) {
      onSubmit(replyContent);
      setReplyContent("");
    }
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length <= maxCharacters) {
      setReplyContent(content);
    }
  };

  const remainingCharacters = maxCharacters - replyContent.length;

  return (
    <motion.div
      className="pl-4 mt-3 font-work-sans"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { ease: "easeOut", duration: 0.4 },
      }}
    >
      <div>
        <span className="font-semibold font-montserrat text-md">
          {loggedInDisplayName}
        </span>
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <motion.textarea
          placeholder="Write a reply..."
          className="w-full text-sm text-black border-b-2 border-mint focus:outline-none focus:border-blue bg-white pr-8 resize-none"
          name="replyContent"
          value={replyContent}
          onChange={handleReplyChange}
          maxLength={maxCharacters}
          rows={1}
          ref={(textarea) => {
            if (textarea) {
              autosize(textarea);
            }
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <AnimatePresence>
          {replyContent.trim().length > 0 && (
            <motion.button
              type="submit"
              className="absolute right-2 bottom-3 text-blue"
              aria-label="Send reply"
              initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 150 }}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </form>
      <motion.div
        className="flex justify-center mr-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <p className="text-sm text-grey -mt-2 mb-4">
          {remainingCharacters} characters remaining
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ReplyBox;
