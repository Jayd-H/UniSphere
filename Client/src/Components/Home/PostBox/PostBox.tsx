import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GreetingHeader from "./GreetingHeader";
import SocietyDropdown from "./SocietyDropdown";
import PostTextArea from "./PostTextArea";
import AlertMessage from "../../Common/AlertMessage";

const PostBox: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const displayName = "Jayden Holdsworth"; // TODO Get user's display name from auth context
  const societies = ["Robotics Club", "Chess Club", "Literature Society"];
  const maxCharacters = 512;

  const handlePostSubmit = () => {
    if (selectedSociety) {
      // TODO Backend logic to handle post submission
      // Prevent SQL injection by sanitizing the input
      const sanitizedContent = postContent.replace(/['"]/g, "");
      console.log("Post content:", sanitizedContent);
      console.log("Selected society:", selectedSociety);

      setPostContent("");
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
      <GreetingHeader displayName={displayName} />
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
