import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import SocietyCard from "../Components/Societies/SocietyCard";
import ExpandedSocietyCard from "../Components/Societies/ExpandedSocietyCard";
import LoadingIcon from "../Components/Common/LoadingIcon";
import SearchBar from "../Components/Common/SearchBar";
import { fetchAllSocieties } from "../api/societiesAPI";
import axios from "axios";
import { Society } from "../types/society";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: easeIn, duration: 0.2 } },
};

const SocietiesPage: React.FC = () => {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [expandedSociety, setExpandedSociety] = useState<Society | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);

  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const data = await fetchAllSocieties();
        if (data.success) {
          setSocieties(data.data);
        } else {
          console.error("Failed to fetch societies:", data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error(
              "Error fetching societies:",
              error.response.data.message
            );
          } else if (error.request) {
            console.error(
              "Error fetching societies: No response received from the server"
            );
          } else {
            console.error("Error fetching societies:", error.message);
          }
        } else {
          console.error("Error fetching societies:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocieties();

    const timer = setTimeout(() => {
      setShowLoadingIcon(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (society: Society) => {
    setExpandedSociety(society);
  };

  const handleCloseExpandedCard = () => {
    setExpandedSociety(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSocieties = societies.filter((society) =>
    society.societyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 pt-4 -mt-16 sm:mt-0">
      <motion.div
        className="text-center font-montserrat-alt"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.h1
          className="text-3xl font-semibold mt-4"
          variants={headingVariants}
        >
          Browse Societies
        </motion.h1>
        <motion.h2
          className="text-xl -mt-4 mb-8 underline decoration-dashed decoration-mint decoration-2"
          variants={headingVariants}
        >
          Click on a society to view more details
        </motion.h2>
        <motion.div variants={headingVariants} className="lg:w-1/2 lg:mx-auto">
          <SearchBar
            placeholder="Search societies..."
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </motion.div>
      </motion.div>
      <div className="max-w-screen-lg mx-auto">
        {isLoading ? (
          showLoadingIcon ? (
            <div className="flex justify-center items-center h-64">
              <LoadingIcon />
            </div>
          ) : null
        ) : (
          <>
            {filteredSocieties.length > 0 ? (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredSocieties.map((society) => (
                  <SocietyCard
                    key={society.id}
                    society={society}
                    onClick={handleCardClick}
                    onLeaveSociety={() => {}}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p
                className="text-center text-xl mt-8 font-montserrat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No societies match your search criteria.
              </motion.p>
            )}
          </>
        )}
      </div>
      <AnimatePresence>
        {expandedSociety && (
          <ExpandedSocietyCard
            society={expandedSociety}
            onClose={handleCloseExpandedCard}
            onLeaveSociety={() => {}}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocietiesPage;
