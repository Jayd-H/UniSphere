import React from "react";
import { useUserContext } from "../UserContext";
import Feed from "../Components/Home/Feed/Feed";
import HomeSocietiesList from "../Components/Home/FeedSocietiesList";

const HomePage: React.FC = () => {
  const { user, societies, setSocieties } = useUserContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <HomeSocietiesList
        societies={societies}
        setSocieties={setSocieties}
        user={user}
      />
      <div className="flex-grow">
        <div className="max-w-2xl mx-auto w-full">
          <Feed />
        </div>
      </div>
      <div className="hidden xl:block w-64 mr-16 ml-8"></div>
    </div>
  );
};

export default HomePage;
