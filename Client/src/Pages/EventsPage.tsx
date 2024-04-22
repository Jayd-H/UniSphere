import React from "react";
import { useUserContext } from "../UserContext";
import EventsFeed from "../Components/Events/Feed/EventsFeed";
import EventsGreetingHeader from "../Components/Events/EventsGreetingHeader";
import RecommendedSocietiesList from "../Components/Common/RecommendedSocietiesList";
import JoinedSocietiesList from "../Components/Common/JoinedSocietiesList";

const EventsPage: React.FC = () => {
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
      <div className="flex-grow max-w-2xl w-full px-4">
        <EventsGreetingHeader />
        <EventsFeed />
      </div>
      <div className="xl:mr-20 lg:mr-4 mt-20">
        <RecommendedSocietiesList />
      </div>
    </div>
  );
};

export default EventsPage;
