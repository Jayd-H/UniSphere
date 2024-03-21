import React from "react";

interface SocietyProps {
  name: string;
  description: string;
  imageUrl: string;
}

const Society: React.FC<SocietyProps> = ({ name, description, imageUrl }) => {
  return (
    <div className="group relative m-4 w-80 h-80">
      <img
        src={imageUrl}
        alt={`Image of ${name}`}
        className="w-full h-full object-cover rounded-lg transition duration-500 ease-in-out group-hover:opacity-50"
      />
      <div className="absolute top-0 w-full h-full rounded-lg p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out bg-black bg-opacity-50">
        <h3 className="text-white text-xl font-bold mb-4">{name}</h3>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
};

export default Society;
