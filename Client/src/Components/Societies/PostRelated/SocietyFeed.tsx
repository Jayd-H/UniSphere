import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import SocietyPost, { SocietyPostProps } from "./SocietyPost";

interface SocietyFeedProps {
  societyId: number;
}

const postVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + index * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const SocietyFeed: React.FC<SocietyFeedProps> = ({ societyId }) => {
  const [posts, setPosts] = useState<SocietyPostProps[]>([]);

  useEffect(() => {
    const fetchSocietyPosts = async () => {
      try {
        // TODO: Make a GET request to the server to fetch posts for the given societyId
        // const response = await fetch(`/api/societies/${societyId}/posts`);
        // const data = await response.json();
        // setPosts(data);

        const mockPosts: SocietyPostProps[] = [
          {
            displayName: "Jayd Holdsworth",
            timestamp: new Date("2023-01-07T14:32:00").toISOString(),
            content:
              "Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!",
            likesCount: 5,
            replies: [],
            repliesCount: 0,
          },
          {
            displayName: "Jayd Holdsworth",
            timestamp: new Date("2023-01-07T14:32:00").toISOString(),
            content:
              "Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!",
            likesCount: 5,
            replies: [
              {
                displayName: "Jayd Holdsworth",
                content:
                  "Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!",
                timestamp: new Date("2023-01-07T14:32:00").toISOString(),
                likesCount: 5,
                index: 0,
              },
              {
                displayName: "Jayd Holdsworth",
                content:
                  "Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!",
                timestamp: new Date("2023-01-07T14:32:00").toISOString(),
                likesCount: 5,
                index: 1,
              },
            ],
            repliesCount: 2,
          },
          {
            displayName: "Jayd Holdsworth",
            timestamp: new Date("2023-01-07T14:32:00").toISOString(),
            content:
              "Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!",
            likesCount: 5,
            replies: [
              {
                displayName: "Jayd Holdsworth",
                content:
                  "Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!",
                timestamp: new Date("2023-01-07T14:32:00").toISOString(),
                likesCount: 5,
                index: 0,
              },
            ],
            repliesCount: 1,
          },
          {
            displayName: "Jayd Holdsworth",
            timestamp: new Date("2023-01-07T14:32:00").toISOString(),
            content:
              "Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!",
            likesCount: 5,
            replies: [],
            repliesCount: 0,
          },
        ];
        setPosts(mockPosts);
      } catch (error) {
        console.error("Error fetching society posts:", error);
      }
    };

    fetchSocietyPosts();
  }, [societyId]);

  return (
    <div>
      {posts.map((post, index) => (
        <motion.div
          key={index}
          variants={postVariants}
          initial="initial"
          animate="visible"
          custom={index}
        >
          <SocietyPost {...post} />
        </motion.div>
      ))}
    </div>
  );
};

export default SocietyFeed;
