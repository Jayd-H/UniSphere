import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GreetingHeader from "./GreetingHeader";
import SocietyDropdown from "./SocietyDropdown";
import PostTextArea from "./PostTextArea";
import AlertMessage from "../../Common/AlertMessage";
import { createPost } from "../../../api/postsAPI";
import { useUserContext } from "../../../UserContext";
import { Society } from "../../../types/society";
import { Post as PostType } from "../../../types/post";

interface PostBoxProps {
  addNewPost: (post: PostType) => void;
}

const PostBox: React.FC<PostBoxProps> = ({ addNewPost }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const maxCharacters = 512;
  const { user, societies } = useUserContext();
  let message = "Please select a society to create a post";

  const handlePostSubmit = async () => {
    if (selectedSociety && user) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const sanitizedContent = postContent.replace(/\\['"]]/g, "");
          const timestamp = new Date().toISOString();
          const { postId } = await createPost(
            sanitizedContent,
            selectedSociety.id,
            token,
            timestamp
          );
          const newPost: PostType = {
            postId,
            postContent: sanitizedContent,
            timestamp,
            societyId: selectedSociety.id,
            societyName: selectedSociety.societyName,
            user: {
              id: user.id,
              displayName: user.displayName,
            },
            likesCount: 0,
            isLiked: false,
            replyCount: 0,
            replies: [],
          };
          addNewPost(newPost);
          setPostContent("");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        message = "Error creating post. Please try again.";
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AlertMessage isSuccess={false} message={message} isVisible={showAlert} />
      {user && <GreetingHeader displayName={user.displayName} />}
      <motion.div
        className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm shadow-muted-mint hover:shadow-mint mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="md:flex md:justify-between grid-cols-1 items-center mb-4">
          <motion.h1
            className="md:text-lg text-xl font-montserrat underline decoration-mint text-center mb-2 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            What's going on?
          </motion.h1>
          <div className="flex justify-center mb-6">
            <SocietyDropdown
              selectedSociety={selectedSociety}
              societies={societies}
              isOpen={isOpen}
              setSelectedSociety={setSelectedSociety}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
        <PostTextArea
          postContent={postContent}
          setPostContent={setPostContent}
          handlePostSubmit={handlePostSubmit}
          selectedSociety={selectedSociety}
          maxCharacters={maxCharacters}
        />
      </motion.div>
    </motion.div>
  );
};

export default PostBox;
