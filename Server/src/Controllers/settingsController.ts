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


  export const changeUsername = async (req: Request, res: Response) => {
    try {
        const { currentUsername, newUsername, password } = req.body;

        if (!currentUsername || !newUsername || !password) {
            return res.status(400).json({ error: "Missing required fields (currentUsername, newUsername, and password)" });
        }

        const user = await Users.findOne({ where: { userName: currentUsername } });
        if (!user) {
            return res.status(401).json({ error: "User with the provided current username not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const existingUser = await Users.findOne({ where: { userName: newUsername } });
        if (existingUser) {
            return res.status(409).json({ error: "New username is already taken" });
        }
        user.userName = newUsername;
        await user.save();

        res.status(200).json({ message: "Username changed successfully" });
    } catch (error) {
        console.error("Error changing username:", error);
        res.status(500).json({ error: "An error occurred while changing username" });
    }
};
