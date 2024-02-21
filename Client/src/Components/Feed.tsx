import React from 'react';
import Post from './Post';

const mockPosts = [
    {
      displayName: 'Jayd Holdsworth',
      societyName: 'Pokémon Society',
      timestamp: new Date('2023-01-07T14:32:00').toISOString(),
      content: 'Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!',
      likesCount: 5,
      replies: [
        {
          displayName: 'Ash Ketchum',
          content: 'I’ll be there with my Pikachu!',
          timestamp: new Date('2023-01-07T15:00:00').toISOString(),
          likesCount: 3,
        },
        {
          displayName: 'Misty Waterflower',
          content: 'Can’t wait to meet everyone! I’ll bring some snacks and drinks for everyone.  See you all there! if you need anything else, let me know!',
          timestamp: new Date('2023-01-07T15:15:00').toISOString(),
          likesCount: 2,
        },
        {
          displayName: 'Misty Waterflower',
          content: 'This is going to be so much fun! I’ll bring some snacks and drinks for everyone.  See you all there!',
          timestamp: new Date('2023-01-07T15:15:00').toISOString(),
          likesCount: 0,
        }
      ]
    },
    {
        displayName: 'Jayd Holdsworth',
        societyName: 'Pokémon Society',
        timestamp: new Date('2023-01-07T14:32:00').toISOString(),
        content: 'Hey guys, super excited for the Pokémon fan meetup in the library today! My favourite Pokémon are Lopunny, Gardevoir, and Gothita. Hope everyone remembers to bring their best switch games. Can anyone confirm if snacks and drinks are available? When I win, I tend to get hungry!',
        likesCount: 5,
        replies: [
          {
            displayName: 'Ash Ketchum',
            content: 'I’ll be there with my Pikachu!',
            timestamp: new Date('2023-01-07T15:00:00').toISOString(),
            likesCount: 3,
          },
          {
            displayName: 'Misty Waterflower',
            content: 'Can’t wait to meet everyone! I’ll bring some snacks and drinks for everyone.  See you all there! if you need anything else, let me know!',
            timestamp: new Date('2023-01-07T15:15:00').toISOString(),
            likesCount: 2,
          },
          {
            displayName: 'Misty Waterflower',
            content: 'This is going to be so much fun! I’ll bring some snacks and drinks for everyone.  See you all there!',
            timestamp: new Date('2023-01-07T15:15:00').toISOString(),
            likesCount: 0,
          }
        ]
      },
]

const Feed: React.FC = () => {
    return (
      <div>
        {mockPosts.map((post, index) => (
          <Post 
            key={index}
            displayName={post.displayName}
            societyName={post.societyName}
            timestamp={post.timestamp}
            content={post.content}
            likesCount={post.likesCount}
            replies={post.replies.map((reply, replyIndex) => ({ ...reply, index: replyIndex }))}
            repliesCount={post.replies.length}
          />
        ))}
      </div>
    );
  };

export default Feed;
