import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import autosize from "autosize";
import { useUserContext } from "../../../../../UserContext";

interface ReplyBoxProps {
  postId: number;
  onSubmit: (content: string) => void;
  maxCharacters: number;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ onSubmit, maxCharacters }) => {
  const [replyContent, setReplyContent] = useState("");
  const { user } = useUserContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const remainingCharacters = maxCharacters - replyContent.length;

  return (
    <motion.div
      className="pl-4 mt-4 font-work-sans"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { ease: "easeOut", duration: 0.4 },
      }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className=" font-montserrat text-base">
          {user?.displayName || ""}
        </span>
        <AnimatePresence>
          {replyContent.trim().length > 0 && (
            <motion.p
              className="text-sm text-grey"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {remainingCharacters} characters remaining
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <motion.textarea
          placeholder="Write a reply..."
          className="w-full text-sm text-black border-2 px-2 py-1 border-mint mb-1 focus:outline-none focus:border-blue rounded-lg bg-white pr-8 resize-none"
          name="replyContent"
          value={replyContent}
          onChange={handleReplyChange}
          onKeyDown={handleKeyDown}
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
              className="absolute right-3 bottom-4 text-blue"
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
    </motion.div>
  );
};

export default ReplyBox;
