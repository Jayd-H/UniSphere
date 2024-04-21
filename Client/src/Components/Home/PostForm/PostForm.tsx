import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PostTextArea from "./PostTextArea";
import SocietyDropdown from "./SocietyDropdown";
import AlertMessage from "../../Common/AlertMessage";
import { createPost } from "../../../api/postsAPI";
import { useUserContext } from "../../../UserContext";
import { Society } from "../../../types/society";
import { Post as PostType } from "../../../types/post";

interface PostFormProps {
  addNewPost: (post: PostType) => void;
  societies: Society[];
  maxCharacters: number;
}

const PostForm: React.FC<PostFormProps> = ({
  addNewPost,
  societies,
  maxCharacters,
}) => {
  const [postContent, setPostContent] = useState("");
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useUserContext();
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
          setSelectedSociety(null);
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
      <motion.div
        className="bg-white rounded-xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-base font-medium mb-1 pr-3 font-montserrat-alt text-center">
          Select a Society to Post
        </h1>
        <div className="flex justify-center mb-6">
          <SocietyDropdown
            selectedSociety={selectedSociety}
            societies={societies}
            isOpen={isDropdownOpen}
            setSelectedSociety={setSelectedSociety}
            setIsOpen={setIsDropdownOpen}
          />
        </div>
        {selectedSociety && (
          <PostTextArea
            postContent={postContent}
            setPostContent={setPostContent}
            handlePostSubmit={handlePostSubmit}
            selectedSociety={selectedSociety}
            maxCharacters={maxCharacters}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default PostForm;
