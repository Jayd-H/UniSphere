import { Request, Response } from 'express';
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