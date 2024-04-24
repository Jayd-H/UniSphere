import React from "react";
import { useUserContext } from "../UserContext";
import Feed from "../Components/Home/Feed/Feed";
import GreetingHeader from "../Components/Home/Feed/GreetingHeader";
import RecommendedSocietiesList from "../Components/Common/RecommendedSocietiesList";
import JoinedSocietiesList from "../Components/Common/JoinedSocietiesList";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  const { user, societies, setSocieties } = useUserContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex lg:justify-between justify-center -mt-10 sm:mt-0">
      <div className="xl:ml-20 lg:ml-4 mt-20">
        <JoinedSocietiesList
          societies={societies}
          setSocieties={setSocieties}
          user={user}
        />
      </div>
      <div className="lg:flex-grow lg:max-w-2xl w-full px-4">
        <GreetingHeader displayName={user.displayName} />
        {societies.length > 0 ? (
          <Feed />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mt-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="text-xl font-light font-montserrat-alt"
            >
              You haven't joined any societies yet.
            </motion.p>
            <Link to="/societies">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="mt-4 text-lg text-black underline-offset-2 underline decoration-wavy decoration-mint hover:decoration-blue"
              >
                Explore Societies
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
      <div className="xl:mr-20 lg:mr-4 mt-20">
        <RecommendedSocietiesList />
      </div>
    </div>
  );
};

export default HomePage;
