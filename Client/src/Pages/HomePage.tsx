import React from "react";
import Feed from "../Components/Home/Feed/Feed";
import PostBox from "../Components/Home/PostBox/PostBox";

const HomePage: React.FC = () => {
  return (
    <>
      <PostBox />
      <div>
        <br />
      </div>
      <Feed />
    </>
  );
};

export default HomePage;
