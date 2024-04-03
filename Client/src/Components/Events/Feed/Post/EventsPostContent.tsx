import React from "react";
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
  return (
    <>
      <motion.p
        className="text-black text-md italic font-montserrat flex items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CalendarIcon className="w-5 h-5 mr-2" />
        {eventType}
      </motion.p>
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-montserrat italic text-grey flex items-center">
          <MapPinIcon className="w-5 h-5 mr-2" />
          {eventLocation}
        </p>
        <p className="pr-4 -mt-8 italic font-montserrat-alt text-md text-black font-light flex items-center">
          {eventTime}
          <ClockIcon className="w-5 h-5 ml-2" />
        </p>
      </motion.div>
      <motion.p
        className="mb-3 mt-3 mr-2 text-black"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {content}
      </motion.p>
    </>
  );
};

export default EventsPostContent;
