import React from "react";
import { useUserContext } from "../UserContext";
import Feed from "../Components/Home/Feed/Feed";

const HomePage: React.FC = () => {
  const { user } = useUserContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <Feed />
    </div>
  );
};

export default HomePage;
