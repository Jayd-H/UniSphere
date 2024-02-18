import React from 'react';

interface ReplyProps {
  username: string;
  content: string;
  timestamp: string;
}

const Reply: React.FC<ReplyProps> = ({ username, content, timestamp }) => {
  return (
    <div className="pl-4 pr-2 py-2 bg-luni-lighter-grey rounded-lg my-2">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-sm">{username}</span>
        <span className="text-xs text-luni-grey">{timestamp}</span>
      </div>
      <p className="text-sm text-luni-grey">{content}</p>
    </div>
  );
};

export default Reply;
