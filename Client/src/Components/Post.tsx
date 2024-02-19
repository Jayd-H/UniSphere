import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, ChevronDownIcon, ChevronUpIcon, HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Reply from './Reply';
import { timeSince } from './TimeUtils';

export interface ReplyProps {
  username: string;
  content: string;
  timestamp: string;
  likesCount: number;
}

export interface PostProps {
  username: string;
  societyName: string;
  timestamp: string;
  content: string;
  repliesCount: number;
  likesCount: number;
  replies: Array<ReplyProps>;
}

const Post: React.FC<PostProps> = ({
  username,
  societyName,
  timestamp,
  content,
  repliesCount,
  likesCount,
  replies
}) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleRepliesVisibility = () => {
    setAreRepliesVisible(!areRepliesVisible);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // BACKEND TODO: Send a request to the backend to update the like count
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow max-w-xl mx-auto my-4">

      {/* Post header */}  
      <div className="flex justify-between items-center mb-3">

        {/* Post user info */}
        <div>
          <span className="font-semibold">{username}</span>
          <span className="text-xs text-luni-grey ml-2">{timeSince(timestamp)}</span>
        </div>

        {/* Society badge */}
        <span className="text-sm font-bold mr-2 px-2.5 py-0.5 rounded bg-luni-blue text-white">{societyName}</span>
      </div>

      {/* Post content */}
      <p className="mb-3">{content}</p>

      {/* Post interactions */}
      <div className="flex justify-between items-center text-sm text-luni-grey">
        {/* Replies button */}
        <div className="flex items-center">
          <ChatBubbleLeftRightIcon className="w-6 h-6 mr-1" />
          <button
            type="button"
            className="flex items-center"
            onClick={toggleRepliesVisibility}
          >
            {areRepliesVisible ? <ChevronUpIcon className="w-5 h-5 mr-1" /> : <ChevronDownIcon className="w-5 h-5 mr-1" />}
            <span>{repliesCount} Replies</span>
          </button>
        </div>

        {/* Like button */}
        <motion.button
          type="button"
          className="flex items-center"
          onClick={handleLike}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          {isLiked ? (
            <motion.div className="w-6 h-6 mr-1 text-red-500" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <HeartSolidIcon fill="#ff0000" />
            </motion.div>
          ) : (
            <HeartOutlineIcon className="w-6 h-6 mr-1" />
          )}
          <span>{likesCount + (isLiked ? 1 : 0)}</span>
        </motion.button>
      </div>

      {/* Replies */}
      {areRepliesVisible && (
        <div className="mt-4">
          {replies.map((reply, index) => (
            <Reply key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
