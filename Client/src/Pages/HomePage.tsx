import React from "react";
import { useUserContext } from "../UserContext";
import Feed from "../Components/Home/Feed/Feed";
import PostBox from "../Components/Home/PostBox/PostBox";

const HomePage: React.FC = () => {
  const { user } = useUserContext();

  if (!user) {
    return <div>Loading...</div>;
  }

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
