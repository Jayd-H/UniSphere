import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GreetingHeader from "./GreetingHeader";
import SocietyDropdown from "./SocietyDropdown";
import PostTextArea from "./PostTextArea";
import AlertMessage from "../../Common/AlertMessage";
import { createPost } from "../../../api/postsApi";
import { User } from "../../../types/User";
import { Society } from "../../../types/Society";

interface PostBoxProps {
  user: User;
  societies: Society[];
}

const PostBox: React.FC<PostBoxProps> = ({ user, societies }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedSociety, setSelectedSociety] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const maxCharacters = 512;

  const handlePostSubmit = async () => {
    if (selectedSociety) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const sanitizedContent: string = postContent.replace(/['"\\]/g, "");
          await createPost(sanitizedContent, selectedSociety, token);
          setPostContent("");
          // Show success message or handle successful post creation
        } else {
          // Handle case when token is not available
          console.error("Authentication token not found");
        }
      } catch (error) {
        console.error("Failed to create post:", error);
        // Show error message or handle post creation failure
      }
    } else {
      setShowAlert(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  return (
    <motion.div
      className="text-black font-montserrat mt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AlertMessage
        isSuccess={false}
        message="Please select a society before making a post"
        isVisible={showAlert}
      />
      <GreetingHeader displayName={user.displayName} />
      <motion.div
        className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm shadow-muted-mint hover:shadow-mint mt-4"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h1
            className="text-lg font-montserrat underline decoration-mint"
            variants={itemVariants}
          >
            What's going on?
          </motion.h1>
          <SocietyDropdown
            selectedSociety={selectedSociety}
            societies={societies}
            isOpen={isOpen}
            setSelectedSociety={setSelectedSociety}
            setIsOpen={setIsOpen}
          />
        </div>
        <PostTextArea
          postContent={postContent}
          setPostContent={setPostContent}
          handlePostSubmit={handlePostSubmit}
          maxCharacters={maxCharacters}
        />
      </motion.div>
    </motion.div>
  );
};

export default PostBox;
