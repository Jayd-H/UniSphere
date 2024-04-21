import React, { useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import EventDescriptionInput from "./InputFields/EventDescriptionInput";
import EventTypeInput from "./InputFields/EventTypeInput";
import EventLocationInput from "./InputFields/EventLocationInput";
import EventDateTimeInput from "./InputFields/EventDateTimeInput";
import { Society } from "../../../types/society";

interface EventsPostTextAreaProps {
  postContent: string;
  setPostContent: (content: string) => void;
  eventType: string;
  setEventType: (type: string) => void;
  eventLocation: string;
  setEventLocation: (location: string) => void;
  eventTime: string;
  setEventTime: (time: string) => void;
  handlePostSubmit: () => void;
  maxCharacters: {
    content: number;
    eventType: number;
    eventLocation: number;
    eventTime: number;
  };
  selectedSociety: Society | null;
}

const EventsPostTextArea: React.FC<EventsPostTextAreaProps> = ({
  postContent,
  setPostContent,
  eventType,
  setEventType,
  eventLocation,
  setEventLocation,
  eventTime,
  setEventTime,
  handlePostSubmit,
  maxCharacters,
  selectedSociety,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length <= maxCharacters.content) {
      setPostContent(content);
    }
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventType = e.target.value;
    if (eventType.length <= maxCharacters.eventType) {
      setEventType(eventType);
    }
  };

  const handleEventLocationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const eventLocation = e.target.value;
    if (eventLocation.length <= maxCharacters.eventLocation) {
      setEventLocation(eventLocation);
    }
  };

  const handleDateTimeChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const eventTime = `${formattedDate} ${formattedTime}`;
      setEventTime(eventTime);
    }
  };

  const isAllFieldsFilled =
    postContent.trim().length > 0 &&
    eventType.trim().length > 0 &&
    eventLocation.trim().length > 0 &&
    eventTime.trim().length > 0;

  const handleSubmit = () => {
    handlePostSubmit();
    if (!selectedSociety) return;
    setEventTime("");
    setEventLocation("");
    setEventType("");
    setPostContent("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isAllFieldsFilled) {
      handleSubmit();
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ height: "auto" }}
      animate={{ height: isAllFieldsFilled ? "auto" : "auto" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <EventDescriptionInput
        value={postContent}
        onChange={handlePostChange}
        maxLength={maxCharacters.content}
      />
      <AnimatePresence>
        {postContent.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <EventTypeInput
              value={eventType}
              onChange={handleEventTypeChange}
              maxLength={maxCharacters.eventType}
            />
            <AnimatePresence>
              {eventType.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <EventLocationInput
                    value={eventLocation}
                    onChange={handleEventLocationChange}
                    maxLength={maxCharacters.eventLocation}
                  />
                  <AnimatePresence>
                    {eventLocation.trim().length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        onKeyPress={handleKeyPress}
                        tabIndex={0}
                      >
                        <EventDateTimeInput
                          selected={selectedDate}
                          onChange={handleDateTimeChange}
                        />
                        {isAllFieldsFilled && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            transition={{
                              duration: 0.2,
                              type: "spring",
                              stiffness: 150,
                            }}
                            className="absolute bottom-3 right-4 p-2 text-blue"
                            onClick={handleSubmit}
                          >
                            <PaperAirplaneIcon className="h-5 w-5" />
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventsPostTextArea;
