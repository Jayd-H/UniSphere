import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface EventsPostContentProps {
  content: string;
  eventType: string;
  eventLocation: string;
  eventTime: string;
}

const EventsPostContent: React.FC<EventsPostContentProps> = ({
  content,
  eventType,
  eventLocation,
  eventTime,
}) => {
  const [expandedText, setExpandedText] = useState<string | null>(null);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return (
      <>
        {text.slice(0, maxLength)}
        <span className="text-blue font-semibold">...</span>
      </>
    );
  };

  const renderExpandedText = () => {
    return (
      <motion.div
        className="italic text-grey text-md font-normal w-full cursor-pointer hover:text-blue break-words px-6"
        onClick={() => setExpandedText(null)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {expandedText}
      </motion.div>
    );
  };

  const renderDesktopView = () => {
    if (expandedText) {
      return null;
    }

    return (
      <motion.div
        className="flex items-center justify-between text-base font-light px-6 mb-2 font-work-sans"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          className={`italic text-grey flex items-center ${
            eventType.length > 15 ? "cursor-pointer hover:text-blue" : ""
          }`}
          onClick={() => {
            if (eventType.length > 15) {
              setExpandedText(eventType);
            }
          }}
        >
          <CalendarIcon className="w-5 h-5 mr-2" />
          {truncateText(eventType, 15)}
        </div>
        <div
          className={`italic text-grey flex items-center ${
            eventLocation.length > 15 ? "cursor-pointer hover:text-blue" : ""
          }`}
          onClick={() => {
            if (eventLocation.length > 15) {
              setExpandedText(eventLocation);
            }
          }}
        >
          <MapPinIcon className="w-5 h-5 mr-2" />
          {truncateText(eventLocation, 15)}
        </div>
        <div className="text-grey flex items-center">
          {eventTime}
          <ClockIcon className="w-5 h-5 ml-2" />
        </div>
      </motion.div>
    );
  };

  const renderMobileView = () => {
    if (expandedText) {
      return null;
    }

    return (
      <motion.div
        className="flex items-center justify-between text-dark-grey px-6 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CalendarIcon
          className="w-5 h-5 cursor-pointer hover:text-blue"
          onClick={() => setExpandedText(eventType)}
        />
        <MapPinIcon
          className="w-5 h-5 cursor-pointer hover:text-blue"
          onClick={() => setExpandedText(eventLocation)}
        />
        <ClockIcon
          className="w-5 h-5 cursor-pointer hover:text-blue"
          onClick={() => setExpandedText(eventTime)}
        />
      </motion.div>
    );
  };

  return (
    <>
      {window.innerWidth <= 640 ? renderMobileView() : renderDesktopView()}
      {expandedText && renderExpandedText()}
      <motion.div
        className="pt-3 pb-6 mr-2 text-dark-grey px-6 break-words"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {content}
      </motion.div>
    </>
  );
};

export default EventsPostContent;
