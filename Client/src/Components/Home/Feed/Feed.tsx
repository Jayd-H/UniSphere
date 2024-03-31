import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import { motion } from "framer-motion";
import { fetchPosts } from "../../../api/postsAPI";
import { useUserContext } from "../../../UserContext";

interface PostData {
  postId: number;
  displayName: string;
  postContent: string;
  timestamp: string;
  societyId: number;
  societyName: string;
  likesCount: number;
  isLiked: boolean;
  replyCount: number;
  replies: ReplyData[];
}

interface ReplyData {
  replyId: number;
  displayName: string;
  replyContent: string;
  timestamp: string;
  likesCount: number;
  isLiked: boolean;
}

const postVariants = {
  initial: { opacity: 0, y: 20 },
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + index * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const { societies } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && societies) {
          const societyIds = societies.map((society) => society.id);
          const postsData = await fetchPosts(societyIds, token);
          setPosts(postsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [societies]);

  return (
    <div>
      {posts.map((post, index) => (
        <motion.div
          key={post.postId}
          variants={postVariants}
          initial="initial"
          animate="visible"
          custom={index}
        >
          <Post
            postId={post.postId}
            displayName={post.displayName}
            postContent={post.postContent}
            timestamp={post.timestamp}
            societyId={post.societyId}
            societyName={post.societyName}
            likesCount={post.likesCount}
            isLiked={post.isLiked}
            replyCount={post.replyCount}
            replies={post.replies}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Feed;
