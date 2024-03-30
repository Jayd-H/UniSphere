import React, { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import AutoResizeTextArea from "./AutoResizeTextArea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  selectedSociety: string;
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

  const DateTimeInput = forwardRef<HTMLInputElement>((props, ref) => (
    <input
      {...props}
      ref={ref}
      type="text"
      value={eventTime}
      placeholder="Event time..?"
      className="date-time-input w-full px-4 py-2 text-md bg-white font-work-sans focus:outline-none border-b-2 focus:border-blue border-mint resize-none"
    />
  ));

  return (
    <motion.div
      className="relative"
      initial={{ height: "auto" }}
      animate={{ height: isAllFieldsFilled ? "auto" : "auto" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <AutoResizeTextArea
        value={postContent}
        onChange={handlePostChange}
        placeholder="Describe your event..."
        maxLength={maxCharacters.content}
        className="px-4"
      />
      <AnimatePresence>
        {postContent.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <AutoResizeTextArea
              value={eventType}
              onChange={handleEventTypeChange}
              placeholder="Type of event..?"
              maxLength={maxCharacters.eventType}
              className="px-4"
            />
            <AnimatePresence>
              {eventType.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <AutoResizeTextArea
                    value={eventLocation}
                    onChange={handleEventLocationChange}
                    placeholder="Event location..?"
                    maxLength={maxCharacters.eventLocation}
                    className="px-4"
                  />
                  <AnimatePresence>
                    {eventLocation.trim().length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <div className="relative">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateTimeChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="dd/MM/yy"
                            customInput={<DateTimeInput />}
                            popperPlacement="bottom-end"
                            popperModifiers={[
                              {
                                name: "offset",
                                options: {
                                  offset: [0, 10],
                                },
                                fn: () => ({}),
                              },
                              {
                                name: "preventOverflow",
                                options: {
                                  rootBoundary: "viewport",
                                  tether: false,
                                  altAxis: true,
                                },
                                fn: () => ({}),
                              },
                            ]}
                            className="text-black bg-white font-montserrat border-dashed border-2 border-black"
                            calendarClassName="text-black bg-white font-montserrat border-dashed border-2 border-black"
                            dayClassName={(date: Date) =>
                              date.getDate() === selectedDate?.getDate()
                                ? "selected"
                                : null
                            }
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
                              className="absolute bottom-0 right-2 p-2 text-blue"
                              onClick={handleSubmit}
                            >
                              <PaperAirplaneIcon className="h-5 w-5" />
                            </motion.button>
                          )}
                        </div>
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
