import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import EventsPostHeader from "./EventsPostHeader";
import EventsPostContent from "./EventsPostContent";
import EventsPostActions from "./EventsPostActions";
import EventsReply from "./Reply/EventsReply";
import ReplyBox from "../../../Home/Feed/Post/Reply/ReplyBox";
import { useUserContext } from "../../../../UserContext";
import { EventsPost as EventsPostType } from "../../../../types/eventsPost";
import { EventsReply as EventsReplyType } from "../../../../types/eventsReply";
import { createEventsReply } from "../../../../api/eventsRepliesAPI";

const postVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const EventsPost: React.FC<EventsPostType> = (eventsPost) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [replies, setReplies] = useState<EventsReplyType[]>(eventsPost.replies);
  const { user } = useUserContext();
  const [postIsLiked, setPostIsLiked] = useState(eventsPost.isLiked);

  const toggleRepliesVisibility = () =>
    setAreRepliesVisible(!areRepliesVisible);

  const handleReplySubmit = async (content: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { replyId } = await createEventsReply(
          eventsPost.eventsPostId,
          content,
          token
        );
        const fakeReply: EventsReplyType = {
          replyId,
          replyContent: content,
          timestamp: new Date().toISOString(),
          user: {
            id: user!.id,
            displayName: user!.displayName,
          },
          likesCount: 0,
          isLiked: false,
        };
        setReplies((prevReplies) => [...prevReplies, fakeReply]);
      }
    } catch (error) {
      console.error("Error creating event reply:", error);
    }
  };

  const repliesCount = replies.length;

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm shadow-mint max-w-2xl mx-auto my-6 font-work-sans"
      variants={postVariants}
      initial="hidden"
      animate="visible"
    >
      <EventsPostHeader
        user={eventsPost.user}
        timestamp={eventsPost.timestamp}
        societyName={eventsPost.societyName}
      />
      <EventsPostContent
        content={eventsPost.eventsPostContent}
        eventType={eventsPost.eventType}
        eventLocation={eventsPost.eventLocation}
        eventTime={eventsPost.eventTime}
      />
      <EventsPostActions
        postId={eventsPost.eventsPostId}
        likesCount={eventsPost.likesCount}
        isLiked={postIsLiked}
        setIsLiked={setPostIsLiked}
        replyCount={eventsPost.replyCount}
        areRepliesVisible={areRepliesVisible}
        toggleRepliesVisibility={toggleRepliesVisibility}
      />
      <AnimatePresence>
        {(areRepliesVisible || repliesCount === 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ReplyBox
              postId={eventsPost.eventsPostId}
              onSubmit={handleReplySubmit}
              maxCharacters={512}
            />
            {replies.map((reply, index) => (
              <EventsReply key={reply.replyId} {...reply} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventsPost;
