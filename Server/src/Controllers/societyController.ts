import { Request, Response } from 'express';
import { UserSocieties } from '../Data/UserSocieties';
import { Societies } from '../Data/Societies';

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
