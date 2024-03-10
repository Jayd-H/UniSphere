import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import { Database } from '../Data/data-source';

import { User } from '../Data/User';

interface UserPasswordRow extends RowDataPacket {
  hash: string;
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const trimmedUsername = req.body.username.trim();
    const existingUser = await Database.getRepository(User).findOne({
      where: { username: trimmedUsername }
    });

    // Check if the user exists before trying to compare passwords
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Now we're sure 'user' is not undefined, we can safely read 'user.hash'
    const isMatch = await bcrypt.compare(password, existingUser.hash);

    if (isMatch) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password, displayName } = req.body;

  try {
    const existingUser = await Database.getRepository(User).findOne({
      where: { username }
    });
    
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Username is already taken." });
    }

    // If username doesn't exist, proceed with creating the new user
    const hash = await bcrypt.hash(password, 10);
    const user = new User();
    user.username = username;
    user.hash = hash;
    user.displayName = displayName;
    await user.save();
    
    return res.status(200).json({ success: true, message: "User registered successfully." });
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
