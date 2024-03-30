import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventsPostTextArea from "./EventsPostTextArea";
import AlertMessage from "../../Common/AlertMessage";
import EventsGreetingHeader from "./EventsGreetingHeader";
import SocietyDropdown from "../../Home/PostBox/SocietyDropdown";

const EventsPostBox: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // TODO Get user's display name from auth context

  const societies = ["Robotics Club", "Chess Club", "Literature Society"];
  const maxCharacters = {
    content: 512,
    eventType: 32,
    eventLocation: 64,
    eventTime: 16,
  };

  const handlePostSubmit = () => {
    if (selectedSociety) {
      // TODO Backend logic to handle post submission
      // Prevent SQL injection by sanitizing the input
      const sanitizedContent = postContent.replace(/['"]/g, "");
      console.log("Post content:", sanitizedContent);
      console.log("Selected society:", selectedSociety);
      console.log("Event Type:", eventType);
      console.log("Event Location:", eventLocation);
      console.log("Event Time:", eventTime);
      setPostContent("");
      setEventType("");
      setEventLocation("");
      setEventTime("");
    } else {
      setShowAlert(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeInOut",
      },
    },
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AlertMessage
        isSuccess={false}
        message="Please select a society before making a post"
        isVisible={showAlert}
      />
      <EventsGreetingHeader />
      <motion.div
        className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm shadow-muted-mint hover:shadow-mint mt-4"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h1
            className="text-lg font-montserrat underline decoration-mint"
            variants={itemVariants}
          >
            What's the event?
          </motion.h1>
          <SocietyDropdown
            selectedSociety={selectedSociety}
            societies={societies}
            isOpen={isOpen}
            setSelectedSociety={setSelectedSociety}
            setIsOpen={setIsOpen}
          />
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
