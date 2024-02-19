// HomePage.tsx
import React from 'react';
import Feed from '../Components/Feed';
import PostBox from '../Components/PostBox';

const HomePage: React.FC = () => {
  return (
    <>
      <PostBox />
        <Feed />
</>
  );
};

export default HomePage;
