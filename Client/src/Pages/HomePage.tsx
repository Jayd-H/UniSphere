import React from 'react';
import Post from '../Components/Post';

const HomePage: React.FC = () => {
  // Mock data array for multiple posts
  const mockPosts = [
    {
      username: 'Jayd Holdsworth',
      societyName: 'Pokémon Society',
      timestamp: 'Jan 7th 2023 14:32',
      content: 'Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!',
      repliesCount: 2,
      likesCount: 5
    },
    {
      username: 'Luna Lovegood',
      societyName: 'Wizarding Society',
      timestamp: 'Jan 7th 2023 14:32',
      content: 'Hey everyone, I just wanted to remind you all that the wizarding society is meeting in the astronomy tower tonight. We will be discussing the latest magical creatures discovered in the forbidden forest. I hope to see you all there!',
      repliesCount: 3,
      likesCount: 7
    },
  ];

  return (
    <div className="p-4">
      {mockPosts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default HomePage;
