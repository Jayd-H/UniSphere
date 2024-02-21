import React from 'react';
import Feed from '../Components/Feed';
import PostBox from '../Components/PostBox';

const HomePage: React.FC = () => {
  return (
    <>
      <PostBox />
      <div>
        <br/>
      </div>
      <Feed />
    </>
  );
};

export default HomePage;
