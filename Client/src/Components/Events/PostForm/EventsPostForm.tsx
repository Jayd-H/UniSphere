import React, { useState } from "react";
import { motion } from "framer-motion";
import EventsPostTextArea from "./EventsPostTextArea";
import SocietyDropdown from "../../Home/PostForm/SocietyDropdown";
import { useUserContext } from "../../../UserContext";
import { Society } from "../../../types/society";
import { EventsPost as EventsPostType } from "../../../types/eventsPost";
import { createEventsPost } from "../../../api/eventsPostsAPI";

interface EventsPostFormProps {
  addNewEventsPost: (post: EventsPostType) => void;
  societies: Society[];
  maxCharacters: {
    content: number;
    eventType: number;
    eventLocation: number;
    eventTime: number;
  };
}

const EventsPostForm: React.FC<EventsPostFormProps> = ({
  addNewEventsPost,
  societies,
  maxCharacters,
}) => {
  const [postContent, setPostContent] = useState("");
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useUserContext();

  const handlePostSubmit = async () => {
    if (selectedSociety && user) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const sanitizedContent = postContent.replace(/\\['"]]/g, "");
          const timestamp = new Date().toISOString();
          const { eventsPostId } = await createEventsPost(
            sanitizedContent,
            selectedSociety.id,
            eventType,
            eventLocation,
            eventTime,
            token,
            timestamp
          );
          const newEventsPost: EventsPostType = {
            eventsPostId,
            eventsPostContent: sanitizedContent,
            timestamp,
            eventType,
            eventLocation,
            eventTime,
            societyId: selectedSociety.id,
            societyName: selectedSociety.societyName,
            user: {
              id: user.id,
              displayName: user.displayName,
            },
            likesCount: 0,
            isLiked: false,
            replyCount: 0,
            replies: [],
          };
          addNewEventsPost(newEventsPost);
          setPostContent("");
          setEventType("");
          setEventLocation("");
          setEventTime("");
          setSelectedSociety(null);
        }
      } catch (error) {
        console.error("Error creating event post:", error);
      }
    } else {
    }
  };

  return (
    <motion.div
      className="text-black font-montserrat mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="bg-white rounded-xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-base font-medium mb-1 pr-2 font-montserrat-alt text-center">
          Select a Society to Post
        </h1>
        <div className="flex justify-center mb-6">
          <SocietyDropdown
            selectedSociety={selectedSociety}
            societies={societies}
            isOpen={isDropdownOpen}
            setSelectedSociety={setSelectedSociety}
            setIsOpen={setIsDropdownOpen}
          />
        </div>
        {selectedSociety && (
          <EventsPostTextArea
            postContent={postContent}
            setPostContent={setPostContent}
            eventType={eventType}
            setEventType={setEventType}
            eventLocation={eventLocation}
            setEventLocation={setEventLocation}
            eventTime={eventTime}
            setEventTime={setEventTime}
            handlePostSubmit={handlePostSubmit}
            maxCharacters={maxCharacters}
            selectedSociety={selectedSociety}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default EventsPostForm;
