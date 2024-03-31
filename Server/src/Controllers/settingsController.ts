import { Request, Response } from 'express';
import { Users } from '../Data/Users';
import bcrypt from 'bcrypt';



export const changePassword = async (req: Request, res: Response) => {
    try {

      const { userName, password, newPassword } = req.body;
      if (!userName || !password) {
        return res.status(400).json({ error: "Missing required fields (username and password)" });
      }
      
      const user = await Users.findOne({where: {userName}});
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" }); 
      }
  
      
      if (user.hash) { 
        const isPasswordValid = await bcrypt.compare(password, user.hash);
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid username or password" }); 
        }
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.hash = hashedPassword;
      await user.save();
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "An error occurred while changing password" }); 
    }
  };

