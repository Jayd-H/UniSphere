import React from "react";

interface SocietyProps {
  name: string;
  description: string;
}

const Society: React.FC<SocietyProps> = ({ name, description }) => {
  return (
    <div className="border p-4 my-2 shadow-lg">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Society;
