import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "./types/user";
import { Society } from "./types/society";
import { fetchUserData } from "./api/userAPI";
import { isTokenExpired } from "./Components/Common/TokenUtils";

interface UserContextType {
  user: User | null;
  societies: Society[];
  setUser: (user: User | null) => void;
  setSocieties: (societies: Society[]) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  societies: [],
  setUser: () => {},
  setSocieties: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [societies, setSocieties] = useState<Society[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          if (isTokenExpired(token)) {
            // Token has expired, log out the user
            setUser(null);
            setSocieties([]);
            localStorage.removeItem("token");
          } else {
            const userData = await fetchUserData(token);
            if (userData.user) {
              setUser(userData.user);
              setSocieties(userData.user.societies);
            } else {
              console.error("Error: User data not received from the server");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, societies, setUser, setSocieties }}>
      {children}
    </UserContext.Provider>
  );
};
