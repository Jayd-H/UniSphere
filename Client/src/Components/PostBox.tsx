import React, { useState } from 'react';

const PostBox = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedSociety, setSelectedSociety] = useState('');

  // Mock societies array - this will eventually come from your backend
  const societies = ['Robotics Club', 'Chess Club', 'Literature Society'];

  const handlePostSubmit = () => {
    // TODO: Backend logic to handle post submission
    console.log('Post content:', postContent);
    console.log('Selected society:', selectedSociety);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto my-6">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-lg">Username</span>
        <select
          value={selectedSociety}
          onChange={(e) => setSelectedSociety(e.target.value)}
          className="text-md font-bold mr-2 px-2.5 py-0.5 rounded bg-luni-blue text-white"
        >
          <option value="" disabled>Select Society</option>
          {societies.map((society, idx) => (
            <option key={idx} value={society}>{society}</option>
          ))}
        </select>
      </div>
      <textarea
        className="w-full p-4 text-md text-luni-black focus:outline-none"
        placeholder="What's going on?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <div className="flex justify-end mr-2">
        <button
          className="bg-luni-blue text-white font-bold py-2 px-4 rounded hover:bg-luni-dark-blue"
          onClick={handlePostSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostBox;
