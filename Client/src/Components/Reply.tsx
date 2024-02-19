import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ReplyProps } from './Post';
import { timeSince } from './TimeUtils';

const Reply: React.FC<ReplyProps> = ({
  username,
  content,
  timestamp,
  likesCount
}) => {
  return (
    <div className="pl-4 pr-2 py-2 bg-luni-lighter-grey rounded-lg my-2">
      <div className="mb-1">
        <span className="font-semibold text-sm">{username}</span>
        <span className="text-xs text-luni-grey ml-2">{timeSince(timestamp)}</span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-luni-grey flex-grow">{content}</p>
        <div className="flex-shrink-0 ml-4 self-end"> {/* Align self to end for vertical alignment */}
          <button type="button" className="flex items-center">
            <HeartIcon className="w-4 h-4 text-luni-grey mr-1" />
            <span className="text-xs text-luni-grey">{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reply;
