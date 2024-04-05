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
        className="text-black text-md italic font-montserrat flex items-center md:justify-start justify-center mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CalendarIcon className="w-5 h-5 mr-2" />
        {eventType}
      </motion.p>

      <motion.div
        className="md:flex md:justify-between md:items-center items-center flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-montserrat italic text-grey flex items-center justify-center mb-2 md:mb-0 md:mr-auto">
          <MapPinIcon className="w-5 h-5 mr-2" />
          {eventLocation}
        </p>

        <p className="italic font-montserrat-alt text-md text-black font-light flex items-center justify-center md:-mt-20 md:ml-auto">
          {eventTime}
          <ClockIcon className="w-5 h-5 ml-2" />
        </p>
      </motion.div>

      <motion.p
        className="mb-3 mt-3 md:mt-10 text-black"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {content}
      </motion.p>
    </>
  );
};

export default EventsPostContent;
