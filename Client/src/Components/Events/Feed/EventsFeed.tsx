import React, { useEffect, useState } from "react";
import EventsPost from "./EventsPost";
import { motion } from "framer-motion";
import { fetchEventPosts } from "../../../api/eventsPostsAPI";
import { useUserContext } from "../../../UserContext";
import { EventsPost as EventsPostType } from "../../../types/eventsPost";

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
  const [eventsPosts, setEventsPosts] = useState<EventsPostType[]>([]);
  const { societies } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && societies) {
          const societyIds = societies.map((society) => society.id);
          const eventsPostsData = await fetchEventPosts(societyIds);
          setEventsPosts(eventsPostsData);
        }
      } catch (error) {
        console.error("Error fetching events posts:", error);
      }
    };
    fetchData();
  }, [societies]);

  return (
    <div>
      {eventsPosts.map((eventPost, index) => (
        <motion.div
          key={eventPost.id}
          variants={postVariants}
          initial="initial"
          animate="visible"
          custom={index}
        >
          <EventsPost {...eventPost} />
        </motion.div>
      ))}
    </div>
  );
};

export default EventsFeed;
