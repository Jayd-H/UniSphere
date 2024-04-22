import React, { useState, useEffect } from "react";
import { motion, spring } from "framer-motion";
import AlertMessage from "../Components/Common/AlertMessage";
import { useUserContext } from "../UserContext";
import { fetchUserDetails } from "../api/settingsAPI";
import UserDetails from "../Components/UserSettings/UserDetails";
import SocietiesList from "../Components/UserSettings/SettingsSocietiesList";
import AccountActions from "../Components/UserSettings/AccountActions";

const UserSettingsPage: React.FC = () => {
  const { user, setUser, societies, setSocieties } = useUserContext();
  const [userDetails, setUserDetails] = useState({
    username: "",
    displayName: "",
    societyCount: 0,
    replyCount: 0,
    regularPostCount: 0,
    eventReplyCount: 0,
    eventPostCount: 0,
  });
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && user) {
          const data = await fetchUserDetails(token);
          setUserDetails(data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, [user]);

  const showAlert = (message: string, isSuccess: boolean) => {
    setAlertMessage(message);
    setIsAlertSuccess(isSuccess);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
        type: spring,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
        type: spring,
      },
    },
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="container mx-auto xl:px-52 px-6 text-black font-montserrat"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-2xl font-semibold text-center font-montserrat-alt mb-8 sm:mt-0 -mt-10 underline underline-offset-4 decoration-muted-mint decoration-dashed"
        variants={childVariants}
      >
        User Settings
      </motion.h1>

      <UserDetails
        user={user}
        userDetails={userDetails}
        showAlert={showAlert}
        setUser={setUser}
      />

      <SocietiesList
        societies={societies}
        setSocieties={setSocieties}
        showAlert={showAlert}
        user={user}
      />
      <div className="">
        <AccountActions showAlert={showAlert} setUser={setUser} />
      </div>
      <AlertMessage
        message={alertMessage}
        isVisible={isAlertVisible}
        isSuccess={isAlertSuccess}
      />
    </motion.div>
  );
};

export default UserSettingsPage;
