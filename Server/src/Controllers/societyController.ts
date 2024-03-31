import { Request, Response } from 'express';
import { UserSocieties } from '../Data/UserSocieties';
import { Societies } from '../Data/Societies';
import { Database } from '../Data/data-source';

export const getAllSocieties = async (req: Request, res: Response) => {
  try {
    const societies = await Societies.find();
    res.status(200).json({ success: true, data: societies });
  } catch (error: any) {
    console.error("Error fetching societies:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserSocieties = async (req: Request, res: Response) => {
  try {
    
    const userSocieties = await UserSocieties.find({ where: { userId: req.user.id } });

    if (!userSocieties || userSocieties.length === 0) {
      return res.status(200).json({ success: true, data: [] }); 
    }

    const societyIds = userSocieties.map((us) => us.societyId);

    const societies = [];
    for (const societyId of societyIds) {
      const society = await Societies.findOne({ where: { id: societyId } });
      if (society) {
        societies.push(society);
      } else {
        console.warn(`Society with id ${societyId} not found`);
      }
    }

    res.status(200).json({ success: true, data: societies });
    return societies;
  } catch (error) {
    console.error("Error fetching user societies:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getSpecificSociety = async (req: Request, res: Response) => {
  try {
    // Extract societyId (adjust for GET request if needed)
    const societyId = req.body?.societyId || req.query?.societyId;

    

    // Find society
    const society = await Database.getRepository(Societies).findOne({ where: { id: societyId } });

    // Handle non-existent society
    if (!society) {
      return res.status(404).json({ success: false, message: "Society not found" });
    }

    // Return retrieved society
    res.status(200).json({ success: true, data: society });
  } catch (error) {
    console.error("Error fetching society:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
