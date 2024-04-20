import React from "react";
import { useUserContext } from "../UserContext";
import EventsFeed from "../Components/Events/Feed/EventsFeed";
import EventsSocietiesList from "../Components/Home/FeedSocietiesList";
import EventsGreetingHeader from "../Components/Events/EventsGreetingHeader";

const EventsPage: React.FC = () => {
  const { user, societies, setSocieties } = useUserContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <EventsSocietiesList
        societies={societies}
        setSocieties={setSocieties}
        user={user}
      />
      <div className="flex-grow">
        <div className="max-w-2xl mx-auto w-full">
          <EventsGreetingHeader />
          <EventsFeed />
        </div>
      </div>
      <div className="hidden xl:block w-64 mr-16 ml-8"></div>
    </div>
  );
};

export default EventsPage;
