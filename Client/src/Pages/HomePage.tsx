// HomePage.tsx
import React from 'react';
import Post from '../Components/Post';

const HomePage: React.FC = () => {
  // Updated mock data array for posts and replies with ISO 8601 date strings
  const mockPosts = [
    {
      username: 'Jayd Holdsworth',
      societyName: 'Pokémon Society',
      // Use an ISO 8601 format for dates
      timestamp: new Date('2023-01-07T14:32:00').toISOString(),
      content: 'Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!',
      likesCount: 5,
      replies: [
        {
          username: 'Ash Ketchum',
          content: 'I’ll be there with my Pikachu!',
          // Use an ISO 8601 format for dates
          timestamp: new Date('2023-01-07T15:00:00').toISOString(),
          likesCount: 3,
        },
        {
          username: 'Misty Waterflower',
          content: 'Can’t wait to meet everyone!',
          // Use an ISO 8601 format for dates
          timestamp: new Date('2023-01-07T15:15:00').toISOString(),
          likesCount: 2,
        }
      ]
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
