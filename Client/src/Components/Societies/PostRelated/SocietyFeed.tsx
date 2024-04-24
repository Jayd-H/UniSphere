import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import SocietyPost from "./SocietyPost";
import { fetchSocietyPosts } from "../../../api/societiesAPI";
import { Post } from "../../../types/post";

interface SocietyFeedProps {
  societyId: number;
}

const postVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + index * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const SocietyFeed: React.FC<SocietyFeedProps> = ({ societyId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetchSocietyPosts(societyId, token);
          setPosts(response);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [societyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center font-light font-montserrat-alt mt-8 text-xl">
        No posts available from this society
      </div>
    );
  }

  return (
    <div>
      {posts.map((post: Post, index: number) => (
        <motion.div
          key={post.postId}
          variants={postVariants}
          initial="initial"
          animate="visible"
          custom={index}
        >
          <SocietyPost {...post} />
        </motion.div>
      ))}
    </div>
  );
};

export default SocietyFeed;
