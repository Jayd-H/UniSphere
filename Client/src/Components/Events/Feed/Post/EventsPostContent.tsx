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

  const renderText = (text: string) => {
    if (expandedText === text) {
      return (
        <div
          className="italic text-grey text-md font-normal flex items-center w-full cursor-pointer hover:text-blue"
          onClick={() => setExpandedText(null)}
        >
          {text}
          <span className="text-blue font-semibold">...</span>
        </div>
      );
    }

    if (text.length > 15) {
      return (
        <div
          className="italic text-grey flex items-center cursor-pointer hover:text-blue sm:max-w-[200px] max-w-[120px] truncate"
          onClick={() => setExpandedText(text)}
        >
          {truncateText(text, window.innerWidth <= 640 ? 10 : 15)}
        </div>
      );
    }

    return <div className="italic text-grey flex items-center">{text}</div>;
  };

  return (
    <>
      <motion.div
        className="flex items-center justify-between text-base font-light px-6 mb-2 font-work-sans"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {expandedText !== eventLocation && (
          <div className="italic text-grey flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            {renderText(eventType)}
          </div>
        )}
        {expandedText !== eventType && (
          <div className="italic text-grey flex items-center">
            <MapPinIcon className="w-5 h-5 mr-2" />
            {renderText(eventLocation)}
          </div>
        )}
        {!expandedText && (
          <div className="text-grey flex items-center">
            {eventTime}
            <ClockIcon className="w-5 h-5 ml-2" />
          </div>
        )}
      </motion.div>
      <motion.div
        className="pt-3 pb-6 mr-2 text-dark-grey px-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {content}
      </motion.div>
    </>
  );
};

export default EventsPostContent;
