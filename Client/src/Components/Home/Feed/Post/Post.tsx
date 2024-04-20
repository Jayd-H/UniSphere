import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Post as PostType } from "../../../../types/post";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import Reply from "./Reply/Reply";
import ReplyBox from "./Reply/ReplyBox";
import { createReply } from "../../../../api/repliesAPI";
import { Reply as ReplyType } from "../../../../types/reply";

const Post: React.FC<PostType> = (post) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [replies, setReplies] = useState(post.replies);

  useEffect(() => {
    if (replies.length === 0) {
      setAreRepliesVisible(true);
    }
  }, [replies]);

  const toggleRepliesVisibility = () =>
    setAreRepliesVisible(!areRepliesVisible);

  const handleReplySubmit = async (content: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { replyId } = await createReply(post.postId, content, token);
        const newReply: ReplyType = {
          replyId,
          replyContent: content,
          timestamp: new Date().toISOString(),
          user: {
            id: post.user.id,
            displayName: post.user.displayName,
          },
          likesCount: 0,
          isLiked: false,
        };
        setReplies((prevReplies) => [...prevReplies, newReply]);
      }
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border-2 pb-2 border-dashed border-muted-mint max-w-2xl mx-auto my-4 font-work-sans"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <PostHeader
        user={post.user}
        timestamp={post.timestamp}
        societyName={post.societyName}
      />
      <PostContent content={post.postContent} />
      <PostActions
        postId={post.postId}
        likesCount={post.likesCount}
        isLiked={post.isLiked}
        replyCount={replies.length}
        areRepliesVisible={areRepliesVisible}
        toggleRepliesVisibility={toggleRepliesVisibility}
      />
      <AnimatePresence>
        <div className="px-6">
          {areRepliesVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  opacity: { duration: 0.2 },
                  height: { duration: 0.4, ease: "easeInOut" },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  opacity: { duration: 0.2 },
                  height: { duration: 0.4, ease: "easeInOut" },
                },
              }}
            >
              <ReplyBox
                postId={post.postId}
                onSubmit={handleReplySubmit}
                maxCharacters={512}
              />
              {replies.map((reply, index) => (
                <Reply key={reply.replyId} {...reply} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Post;
