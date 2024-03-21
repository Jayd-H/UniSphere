import React, { useEffect, useState } from "react";
import Society from "../Components/Society";

interface SocietyData {
  id: number;
  name: string;
  description: string;
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
    <div>
      <h1 className="text-3xl font-bold underline">Societies</h1>
      <div>
        {societies.map((society) => (
          <Society
            key={society.id}
            name={society.name}
            description={society.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SocietiesPage;
