import React from "react";
import { useUserContext } from "../UserContext";
import Feed from "../Components/Home/Feed/Feed";
import GreetingHeader from "../Components/Home/Feed/GreetingHeader";
import RecommendedSocietiesList from "../Components/Common/RecommendedSocietiesList";
import JoinedSocietiesList from "../Components/Common/JoinedSocietiesList";

const HomePage: React.FC = () => {
  const { user, societies, setSocieties } = useUserContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex lg:justify-between justify-center -mt-10 sm:mt-0">
      <div className="xl:ml-20 lg:ml-4 mt-20">
        <JoinedSocietiesList
          societies={societies}
          setSocieties={setSocieties}
          user={user}
        />
      </div>
      <div className="lg:flex-grow lg:max-w-2xl w-full px-4">
        <GreetingHeader displayName={user.displayName} />
        <Feed />
      </div>
      <div className="xl:mr-20 lg:mr-4 mt-20">
        <RecommendedSocietiesList />
      </div>
    </div>
  );
};

export default HomePage;
