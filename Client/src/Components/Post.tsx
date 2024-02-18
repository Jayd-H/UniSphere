import React from 'react';
import { ChatBubbleLeftRightIcon, HeartIcon } from '@heroicons/react/24/outline';

interface PostProps {
  username: string;
  societyName: string;
  timestamp: string;
  content: string;
  repliesCount: number;
  likesCount: number;
}

const Post: React.FC<PostProps> = ({
  username,
  societyName,
  timestamp,
  content,
  repliesCount,
  likesCount
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow max-w-xl mx-auto my-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold">{username}</span>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{societyName}</span>
      </div>
      <p className="mb-3">{content}</p>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center">
          <ChatBubbleLeftRightIcon className="w-6 h-6 mr-1" />
          <span>{repliesCount} Replies</span>
        </div>
        <div className="flex items-center">
          <span>{timestamp}</span>
        </div>
        <div className="flex items-center">
          <button type="button" className="flex items-center">
            <HeartIcon className="w-6 h-6 mr-1" />
            <span>{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
