// Reply.tsx
import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ReplyProps } from './Post';
import { timeSince } from './TimeUtils'; // Ensure this path is correct

const Reply: React.FC<ReplyProps> = ({
  username,
  content,
  timestamp,
  likesCount
}) => {
  return (
    <div className="pl-4 pr-2 py-2 bg-luni-lighter-grey rounded-lg my-2">
      <div className="flex justify-between items-start">
        <div>
          <span className="font-semibold text-sm">{username}</span>
          <span className="text-xs text-luni-grey ml-2">{timeSince(timestamp)}</span>
          <p className="text-sm text-luni-grey mt-1">{content}</p>
        </div>
        <div className="flex flex-col items-end">
          <button type="button" className="flex items-center mt-auto">
            <HeartIcon className="w-4 h-4 text-luni-grey mr-1" />
            <span className="text-xs text-luni-grey">{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reply;
