// HomePage.tsx
import React from 'react';
import Feed from '../Components/Feed'; // Adjust the path as necessary

const HomePage: React.FC = () => {
  return (
    // Apply the bg-luni-light-blue class to the top-level div
    // Also ensure it stretches to the full height by using h-screen
    <div>
      <Feed />
    </div>
  );
};

export default HomePage;
