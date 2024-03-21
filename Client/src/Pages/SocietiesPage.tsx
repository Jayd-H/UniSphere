import React, { useEffect, useState } from "react";
import Society from "../Components/Society";

interface SocietyData {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const SocietiesPage: React.FC = () => {
  const [societies, setSocieties] = useState<SocietyData[]>([]);

  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const response = await fetch(
          "https://unispherebackend.vercel.app/api/societies/all"
        );
        const data = await response.json();
        if (data.success) {
          setSocieties(data.data);
        } else {
          console.error("Failed to fetch societies:", data.message);
        }
      } catch (error) {
        console.error("Error fetching societies:", error);
      }
    };

    fetchSocieties();
  }, []);

  return (
    <div className="px-4 pt-4">
      <h1 className="text-3xl font-bold underline text-center my-8">
        Societies
      </h1>
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {societies.map((society) => (
            <Society
              key={society.id}
              name={society.name}
              description={society.description}
              imageUrl={society.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocietiesPage;
