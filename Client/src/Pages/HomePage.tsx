import React from 'react';
import Post from '../Components/Post';

const HomePage: React.FC = () => {
  // Mock data array for posts and replies
  const mockPosts = [
    {
      username: 'Jayd Holdsworth',
      societyName: 'Pokémon Society',
      timestamp: 'Jan 7th 2023 14:32',
      content: 'Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!',
      replies: [
        { username: 'Ash Ketchum', content: 'I’ll be there with my Pikachu!', timestamp: 'Jan 7th 2023 15:00' },
        { username: 'Misty Waterflower', content: 'Can’t wait to meet everyone!', timestamp: 'Jan 7th 2023 15:15' },
      ],
      likesCount: 5
    },
    // ... Additional posts ...
  ];

  return (
    <div className="p-4">
      {mockPosts.map((post, index) => (
        <Post 
          key={index}
          username={post.username}
          societyName={post.societyName}
          timestamp={post.timestamp}
          content={post.content}
          repliesCount={post.replies.length} 
          likesCount={post.likesCount}
          replies={post.replies}
        />
      ))}
    </div>
  );
};

export default HomePage;
