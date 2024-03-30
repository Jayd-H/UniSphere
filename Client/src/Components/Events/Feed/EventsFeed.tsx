import React from "react";
import EventsPost from "./EventsPost";
import { motion } from "framer-motion";

// Mock data for event posts
const mockEventPosts = [
  {
    displayName: "Jayd Holdsworth",
    societyName: "Pokémon Society",
    timestamp: new Date("2023-01-07T14:32:00").toISOString(),
    content:
      "Join us for a Pokémon fan meetup in the library today! We'll have tournaments, trading, and discussions about strategies and lore. Bring your best switch games and let's have some fun!",
    likesCount: 5,
    eventType: "Pokémon Meetup",
    eventLocation: "Library",
    eventTime: "14/03/24 03:00",
    replies: [
      {
        displayName: "Ash Ketchum",
        content: "I'll be there with my Pikachu!",
        timestamp: new Date("2023-01-07T15:00:00").toISOString(),
        likesCount: 3,
      },
      {
        displayName: "Misty Waterflower",
        content:
          "Can't wait to meet everyone! I'll bring some snacks and drinks.",
        timestamp: new Date("2023-01-07T15:15:00").toISOString(),
        likesCount: 2,
      },
    ],
  },
  {
    displayName: "Ash Ketchum",
    societyName: "Pokémon Society",
    timestamp: new Date("2023-01-07T14:30:00").toISOString(),
    content:
      "Hey everyone! We're planning a Pokémon tournament next week. Get your teams ready and let's battle it out to see who's the best trainer in the club!",
    likesCount: 10,
    eventType: "Pokémon Tournament",
    eventLocation: "Pokémon Center",
    eventTime: "14/03/24 03:00",
    replies: [
      {
        displayName: "Jayd Holdsworth",
        content: "Count me in! I've been training my Charizard for this.",
        timestamp: new Date("2023-01-07T15:00:00").toISOString(),
        likesCount: 5,
      },
      {
        displayName: "Misty Waterflower",
        content: "I'll be there to cheer you on, Ash!",
        timestamp: new Date("2023-01-07T15:15:00").toISOString(),
        likesCount: 3,
      },
    ],
  },
  {
    displayName: "Misty Waterflower",
    societyName: "Pokémon Society",
    timestamp: new Date("2023-01-07T14:28:00").toISOString(),
    content:
      "Calling all Pokémon fans! We're hosting a movie night this weekend. Get ready to watch the latest Pokémon movie and enjoy some popcorn and drinks with us.",
    likesCount: 8,
    eventType: "Pokémon Movie Night",
    eventLocation: "Pokémon Center",
    eventTime: "14/03/24 03:00",
    replies: [
      {
        displayName: "Ash Ketchum",
        content:
          "I'm excited to see the new movie! Thanks for organizing this.",
        timestamp: new Date("2023-01-07T15:00:00").toISOString(),
        likesCount: 4,
      },
      {
        displayName: "Jayd Holdsworth",
        content: "I'll bring some snacks for everyone to enjoy!",
        timestamp: new Date("2023-01-07T15:15:00").toISOString(),
        likesCount: 2,
      },
    ],
  },
];

const postVariants = {
  initial: { opacity: 0, y: 20 },
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + index * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const EventsFeed: React.FC = () => {
  return (
    <div>
      {mockEventPosts.map((eventPost, index) => (
        <motion.div
          key={index}
          variants={postVariants}
          initial="initial"
          animate="visible"
          custom={index}
        >
          <EventsPost
            displayName={eventPost.displayName}
            societyName={eventPost.societyName}
            timestamp={eventPost.timestamp}
            content={eventPost.content}
            likesCount={eventPost.likesCount}
            eventType={eventPost.eventType}
            eventLocation={eventPost.eventLocation}
            eventTime={eventPost.eventTime}
            replies={eventPost.replies.map((reply, replyIndex) => ({
              ...reply,
              index: replyIndex,
            }))}
            repliesCount={eventPost.replies.length}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default EventsFeed;
