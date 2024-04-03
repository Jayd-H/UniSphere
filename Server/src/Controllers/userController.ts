import { Request, Response } from 'express';
import { Users } from '../Data/Users';

export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await Users.findOne({ where: { id: userId }, relations: ['societies'] });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userData = {
      id: user.id,
      userName: user.userName,
      displayName: user.displayName,
      societies: user.societies,
    };

    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
