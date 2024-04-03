import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import autosize from "autosize";
import { Society } from "../../../types/society";

interface PostTextAreaProps {
  postContent: string;
  setPostContent: (content: string) => void;
  handlePostSubmit: () => void;
  selectedSociety: Society | null;
  maxCharacters: number;
}

const PostTextArea: React.FC<PostTextAreaProps> = ({
  postContent,
  setPostContent,
  handlePostSubmit,
  maxCharacters,
}) => {
  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length <= maxCharacters) {
      setPostContent(content);
    }
  };

  const remainingCharacters = maxCharacters - postContent.length;

  return (
    <div className="relative px-2">
      <motion.textarea
        className="w-full p-4 py-2 pr-12 text-md bg-white font-work-sans focus:outline-none border-b-2 focus:border-blue border-mint resize-none"
        placeholder="Begin typing here..."
        value={postContent}
        onChange={handlePostChange}
        maxLength={maxCharacters}
        rows={1}
        ref={(textarea) => {
          if (textarea) {
            autosize(textarea);
          }
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <AnimatePresence>
        {postContent.trim().length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 150 }}
            className="absolute bottom-8 right-4 p-2 text-blue"
            onClick={handlePostSubmit}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.div
        className="flex justify-end mr-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-sm text-gray-500">
          {remainingCharacters} characters remaining
        </p>
      </motion.div>
    </div>
  );
};

export default PostTextArea;
