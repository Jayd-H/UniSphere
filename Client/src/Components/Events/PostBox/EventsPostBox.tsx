import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventsPostTextArea from "./EventsPostTextArea";
import AlertMessage from "../../Common/AlertMessage";
import EventsGreetingHeader from "./EventsGreetingHeader";
import SocietyDropdown from "../../Home/PostBox/SocietyDropdown";
import { useUserContext } from "../../../UserContext";
import { Society } from "../../../types/society";
import { EventsPost as EventsPostType } from "../../../types/eventsPost";
import { createEventsPost } from "../../../api/eventsPostsAPI";

interface EventsPostBoxProps {
  addNewEventsPost: (post: EventsPostType) => void;
}

const EventsPostBox: React.FC<EventsPostBoxProps> = ({ addNewEventsPost }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { user, societies } = useUserContext();

  const maxCharacters = {
    content: 512,
    eventType: 32,
    eventLocation: 64,
    eventTime: 16,
  };

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
        }
      } catch (error) {
        console.error("Error creating event post:", error);
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  return (
    <motion.div
      className="text-black font-montserrat mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AlertMessage
        isSuccess={false}
        message="Please select a society to create an event post"
        isVisible={showAlert}
      />
      {user && <EventsGreetingHeader />}
      <motion.div
        className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm shadow-muted-mint hover:shadow-mint mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="md:flex md:justify-between grid-cols-1 items-center mb-4">
          <motion.h1
            className="md:text-lg text-xl font-montserrat underline decoration-mint text-center mb-2 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            What's the event?
          </motion.h1>
          <div className="flex justify-center mb-6">
            <SocietyDropdown
              selectedSociety={selectedSociety}
              societies={societies}
              isOpen={isOpen}
              setSelectedSociety={setSelectedSociety}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
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
      </motion.div>
    </motion.div>
  );
};

export default EventsPostBox;
