import React, { useState, useRef, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChevronDownIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import SocietyFeed from "./PostRelated/SocietyFeed";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  joinSociety,
  leaveSociety,
  fetchSocietyMemberCount,
} from "../../api/societiesAPI";
import { useUserContext } from "../../UserContext";

interface ExpandedSocietyCardProps {
  society: {
    id: number;
    societyName: string;
    description: string;
    imageURL: string;
  };
  onClose: () => void;
  onLeaveSociety: (societyId: number) => void;
}
const backgroundVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
  exit: { opacity: 0, scale: 0.8 },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

const iconVariants: Variants = {
  hover: { scale: 1.2 },
  tap: { scale: 0.8 },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const ExpandedSocietyCard: React.FC<ExpandedSocietyCardProps> = ({
  society,
  onClose,
  onLeaveSociety,
}) => {
  const { user, societies, setSocieties } = useUserContext();
  const [showPosts, setShowPosts] = useState(false);
  const [hasJoined, setHasJoined] = useState(
    societies.some((s) => s.id === society.id)
  );
  const scrollbarRef = useRef<Scrollbars>(null);
  const [memberCount, setMemberCount] = useState(0);

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const count = await fetchSocietyMemberCount(society.id);
        setMemberCount(count);
      } catch (error) {
        console.error("Error fetching member count:", error);
      }
    };

    fetchMemberCount();
  }, [society.id]);

  const handleJoinSociety = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        await joinSociety(society.id, user.id, token);
        setHasJoined(true);
        setSocieties([...societies, society]);
        setMemberCount(memberCount + 1);
      }
    } catch (error) {
      console.error("Error joining society:", error);
    }
  };

  const handleLeaveSociety = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && user) {
        await leaveSociety(society.id, user.id, token);
        setHasJoined(false);
        onLeaveSociety(society.id);
        setSocieties(societies.filter((s) => s.id !== society.id));
        setMemberCount(memberCount - 1);
      }
    } catch (error) {
      console.error("Error leaving society:", error);
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <div className="relative flex justify-center items-center">
        <motion.div
          className="bg-white rounded-lg p-8 w-2/3 relative flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <XMarkIcon className="h-6 w-6" />
          </motion.button>
          <div className="flex mb-6">
            <motion.div
              className="w-1/2 h-64 overflow-hidden mr-8 relative"
              variants={imageVariants}
            >
              <img
                src={society.imageURL}
                alt={`Image of ${society.societyName}`}
                className="object-cover w-full h-full rounded-md shadow-inner"
              />
              <motion.div
                className="absolute top-3 right-4 bg-white bg-opacity-75 rounded-lg px-2 py-1 flex items-center"
                variants={textVariants}
              >
                <UserGroupIcon className="h-5 w-5 text-gray-600 mr-1" />
                <span className="text-gray-800 font-bold">{memberCount}</span>
              </motion.div>
              <motion.button
                className={`absolute bottom-3 right-4 ${
                  hasJoined
                    ? "bg-mint-muted-mint-t2b hover:bg-dark-mint-muted-mint-t2b text-dark-grey shadow-inner"
                    : "bg-blue-dark-blue-b2t shadow-inner hover:bg-blue-dark-blue-t2b text-white"
                }  font-bold py-2 px-6 rounded-lg focus:outline-none shadow-md font-montserrat-alt`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={hasJoined ? handleLeaveSociety : handleJoinSociety}
              >
                {hasJoined ? "Leave" : "Join"}
              </motion.button>
            </motion.div>
            <div className="w-1/2">
              <motion.h2
                className="text-2xl font-bold mb-4"
                variants={textVariants}
              >
                {society.societyName}
              </motion.h2>
              <motion.p
                className="text-dark-grey mb-1 font-work-sans"
                variants={textVariants}
              >
                {society.description}
              </motion.p>
            </div>
          </div>
          <motion.div variants={dropdownVariants}>
            <motion.button
              className="flex items-center text-xl font-bold underline decoration-wavy decoration-blue"
              onClick={togglePosts}
              variants={buttonVariants}
              whileTap="tap"
            >
              Latest posts by {society.societyName}
              <motion.div
                animate={{ rotate: showPosts ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDownIcon className="h-6 w-6 ml-2" />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {showPosts && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <Scrollbars
                    ref={scrollbarRef}
                    style={{ width: "100%", height: "300px" }}
                    renderThumbVertical={(props) => (
                      <div {...props} className="bg-gray-400 rounded" />
                    )}
                  >
                    <SocietyFeed societyId={society.id} />
                  </Scrollbars>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExpandedSocietyCard;
