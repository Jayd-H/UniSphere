import React from "react";
import EventsFeed from "../Components/Events/Feed/EventsFeed";
import EventsPostBox from "../Components/Events/PostBox/EventsPostBox";

const EventsPage: React.FC = () => {
  return (
    <>
      <EventsPostBox />
      <div>
        <br />
      </div>
      <EventsFeed />
    </>
  );
};

export default EventsPage;
