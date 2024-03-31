import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  ChevronUpIcon,
  ClockIcon,
  MapPinIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Reply from "../../Home/Feed/Post/Reply/Reply";
import { timeSince } from "../../Common/TimeUtils";
import ReplyBox from "../../Home/Feed/Post/Reply/ReplyBox";
import { useUserContext } from "../../../UserContext";
import {
  likeEventPost,
  unlikeEventPost,
  fetchEventPostLikes,
} from "../../../api/eventsPostsAPI";
import { fetchEventPostReplies } from "../../../api/eventsPostsRepliesAPI";
import { fetchUserDisplayName } from "../../../api/userAPI";
import { EventsPost as EventsPostType } from "../../../types/eventsPost";
import { Reply as ReplyType } from "../../../types/reply";

export interface ReplyProps {
  displayName: string;
  content: string;
  timestamp: string;
  likesCount: number;
  index: number;
}

export interface EventsPostProps {
  displayName: string;
  societyName: string;
  timestamp: string;
  content: string;
  likesCount: number;
  eventType: string;
  eventLocation: string;
  eventTime: string;
  repliesCount: number;
  replies: Array<ReplyProps>;
}

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

const nameVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1 },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const heartVariants: Variants = {
  hover: {
    scale: 1.3,
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
  },
  tap: {
    scale: 0.4,
    transition: { duration: 0.1, type: "spring", stiffness: 100, damping: 0 },
  },
};

const EventsPost: React.FC<EventsPostType> = ({
  id,
  userId,
  societyId,
  timestamp,
  content,
  eventType,
  eventLocation,
  eventTime,
}) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [societyName, setSocietyName] = useState("");
  const { user, societies } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDisplayName = await fetchUserDisplayName(userId);
        setDisplayName(userDisplayName);

        const eventPostLikes = await fetchEventPostLikes(id);
        setLikesCount(eventPostLikes.length);

        if (user) {
          setIsLiked(eventPostLikes.includes(user.id));
        }

        const repliesData = await fetchEventPostReplies(id);
        setReplies(repliesData);

        const society = societies.find((society) => society.id === societyId);
        if (society) {
          setSocietyName(society.societyName);
        }
      } catch (error) {
        console.error("Error fetching event post data:", error);
      }
    };
    fetchData();
  }, [id, userId, user, societies]);

  const toggleRepliesVisibility = () =>
    setAreRepliesVisible(!areRepliesVisible);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        if (isLiked) {
          await unlikeEventPost(id, token);
          setLikesCount(likesCount - 1);
        } else {
          await likeEventPost(id, token);
          setLikesCount(likesCount + 1);
        }
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error liking/unliking event post:", error);
    }
  };

  const handleReplySubmit = (content: string) => {
    // TODO: Implement the logic to create a new reply
    console.log(content);
  };

  const repliesCount = replies.length;

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm shadow-mint max-w-2xl mx-auto my-6 font-work-sans"
      variants={postVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center">
        <motion.div variants={nameVariants}>
          <span className="font-semibold font-montserrat text-lg">
            {displayName}
          </span>
          <span className="text-sm text-grey ml-2">{timeSince(timestamp)}</span>
        </motion.div>
        <motion.button
          className="text-md mr-2 px-2.5 py-0.5 rounded font-montserrat border-2 border-mint border-dashed text-black"
          variants={badgeVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {societyName}
        </motion.button>
      </div>
      <motion.p
        className="text-black text-md italic font-montserrat flex items-center"
        variants={contentVariants}
      >
        <CalendarIcon className="w-5 h-5 mr-2" />
        {eventType}
      </motion.p>
      <motion.div
        className="flex justify-between items-center"
        variants={contentVariants}
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
        variants={contentVariants}
      >
        {content}
      </motion.p>
      <div className="flex justify-between items-center text-sm text-blue">
        <motion.button
          type="button"
          className="flex items-center"
          onClick={toggleRepliesVisibility}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6 mr-1" />
          <motion.div
            animate={{ rotate: areRepliesVisible ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <ChevronUpIcon className="w-5 h-5 mr-1" />
          </motion.div>
          <span>{repliesCount} Replies</span>
        </motion.button>
        <div className="flex items-center mr-0.5">
          <motion.button
            type="button"
            onClick={handleLike}
            variants={heartVariants}
            whileHover="hover"
            whileTap="tap"
            className="focus:outline-none"
          >
            {isLiked ? (
              <HeartSolidIcon className="w-6 h-6 text-red" />
            ) : (
              <HeartOutlineIcon className="w-6 h-6 text-blue" />
            )}
          </motion.button>
          <span className="ml-1 text-black">
            {likesCount + (isLiked ? 1 : 0)}
          </span>
          {/* TODO DELETE THIS LINE WHEN WE GET LIKES INTEGRATED */}
        </div>
      </div>
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
              postId={id}
              onSubmit={handleReplySubmit}
              maxCharacters={512}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  staggerChildren: 0.1,
                },
              }}
              exit={{ opacity: 0, y: -40 }}
            >
              {replies.map((reply, index) => (
                <Reply key={reply.id} {...reply} index={index} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventsPost;
