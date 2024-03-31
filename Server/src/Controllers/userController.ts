import { Request, Response } from 'express';
import { Users } from '../Data/Users';
import { Societies } from '../Data/Societies';

export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await Users.findOne({ where: { id: userId }, relations: ['societies'] });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const fetchUserDisplayName = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await Users.findOneBy({ id: userId });
    if (user) {
      res.json({ displayName: user.displayName });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user display name:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserJoinedSocieties = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await Users.findOne({ where: { id: userId }, relations: ['societies'] });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const societyIds = user.societies.map(society => society.id);
    const societies = await Societies.findByIds(societyIds);

    res.status(200).json({ success: true, societies });
  } catch (error) {
    console.error("Error fetching user joined societies:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};