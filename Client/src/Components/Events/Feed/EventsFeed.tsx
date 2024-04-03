import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fetchEventPosts } from "../../../api/eventsPostsAPI";
import { EventsPost as EventsPostType } from "../../../types/eventsPost";
import EventsPost from "./Post/EventsPost";
import EventsPostBox from "../PostBox/EventsPostBox";
import Pagination from "../../Home/Feed/Pagination";

const EventsFeed: React.FC = () => {
  const [eventsPosts, setEventsPosts] = useState<EventsPostType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const addNewEventsPost = (post: EventsPostType) => {
    setEventsPosts((prevPosts) => [post, ...prevPosts]);
  };

  const fetchEventsPostsData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetchEventPosts([], token, page);
        if (response && response.eventPosts) {
          const newEventsPosts = response.eventPosts;
          const totalPages = response.totalPages;
          setEventsPosts(newEventsPosts);
          setTotalPages(totalPages);
        } else {
          console.error("Invalid response data:", response);
        }
      }
    } catch (error) {
      setError(error as Error);
    }
  };
  useEffect(() => {
    fetchEventsPostsData();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (feedRef.current) {
      feedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={feedRef}>
      <EventsPostBox addNewEventsPost={addNewEventsPost} />
      {eventsPosts.map((eventsPost, index) => (
        <motion.div
          key={`${eventsPost.eventsPostId}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * index, duration: 0.6, ease: "easeOut" }}
        >
          <EventsPost {...eventsPost} />
        </motion.div>
      ))}
      <div className="flex justify-center mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.2, duration: 0.6, ease: "easeOut" }}
        >
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </motion.div>
      </div>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default EventsFeed;
