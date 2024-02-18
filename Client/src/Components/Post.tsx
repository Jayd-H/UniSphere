import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, HeartIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Reply from './Reply';

// Interface for the props expected by the Reply component
interface ReplyProps {
  username: string;
  content: string;
  timestamp: string;
}

interface PostProps {
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

  const toggleRepliesVisibility = () => {
    setAreRepliesVisible(!areRepliesVisible);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow max-w-xl mx-auto my-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold">{username}</span>
        <span className="text-sm font-semibold mr-2 px-2.5 py-0.5 rounded bg-luni-blue text-white">{societyName}</span>
      </div>
      <p className="mb-3">{content}</p>
      <div className="flex justify-between items-center text-sm text-luni-grey">
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
        <span className="text-xs">{timestamp}</span>
        <button type="button" className="flex items-center">
          <HeartIcon className="w-6 h-6 mr-1" />
          {likesCount}
        </button>
      </div>
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
