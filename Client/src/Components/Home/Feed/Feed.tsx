import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fetchPosts } from "../../../api/postsAPI";
import { useUserContext } from "../../../UserContext";
import { Post as PostType } from "../../../types/post";
import Post from "./Post/Post";
import PostForm from "../PostForm/PostForm";
import Pagination from "./Pagination";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const { user, societies } = useUserContext();
  const feedRef = useRef<HTMLDivElement>(null);

  const addNewPost = (post: PostType) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  const fetchPostsData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && societies) {
        const societyIds = societies.map((society) => society.id);
        const response = await fetchPosts(societyIds, token, page);
        const newPosts = response.posts;
        const totalPages = response.totalPages;
        setPosts(newPosts);
        setTotalPages(totalPages);
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (feedRef.current) {
      feedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={feedRef}>
      {user && (
        <PostForm
          societies={societies || []}
          addNewPost={addNewPost}
          maxCharacters={512}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-xl font-light font-montserrat-alt text-center mt-6">
          Recent Posts
        </h1>
      </motion.div>
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-md font-light font-montserrat-alt">
            No posts found in your societies.
          </p>
        </motion.div>
      ) : (
        posts.map((post, index) => (
          <motion.div
            key={`${post.postId}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6, ease: "easeOut" }}
          >
            <Post {...post} />
          </motion.div>
        ))
      )}
      <div className="flex justify-center mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.2, duration: 0.6, ease: "easeOut" }}
        >
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </motion.div>
      </div>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Feed;
