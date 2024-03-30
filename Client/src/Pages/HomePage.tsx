import React, { useEffect, useState } from "react";
import Feed from "../Components/Home/Feed/Feed";
import PostBox from "../Components/Home/PostBox/PostBox";
import { getUserProfile } from "../api/userApi";
import { User } from "../types/User";
import { Society } from "../types/Society";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [societies, setSocieties] = useState<Society[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userProfile = await getUserProfile(token);
          setUser(userProfile);
          setSocieties(userProfile.societies);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      {user && <PostBox user={user} societies={societies} />}
      <div>
        <br />
      </div>
      <Feed />
    </>
  );
};

export default HomePage;
