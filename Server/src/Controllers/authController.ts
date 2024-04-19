import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Database } from '../Data/data-source';
import jwt from 'jsonwebtoken';
import { Users } from '../Data/Users';
import { validationResult } from 'express-validator';

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  const { userName, password } = req.body;

  try {
    const existingUser = await Database.getRepository(Users).findOne({
      where: { userName }
    });

    if (!existingUser) {
      console.error(`Login error: User with username '${userName}' not found.`);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.hash);

    if (isMatch) {
      // User authenticated, create JWT
      const userPayload = { id: existingUser.id, userName: existingUser.userName };

      // Assert ACCESS_TOKEN_SECRET is not undefined
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;

      if (!accessTokenSecret) {
        console.error('ACCESS_TOKEN_SECRET is not defined.');
        return res.status(500).json({ success: false, message: "Server configuration error" });
      }

      const accessToken = jwt.sign(userPayload, accessTokenSecret, { expiresIn: '1h' });

      console.log(`User '${userName}' logged in successfully.`);
      res.status(200).json({ success: true, message: "Login successful", accessToken });
    } else {
      console.error(`Login error: Invalid credentials for user '${userName}'.`);
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error: any) {
    console.error(`Login error: ${error.message}`, {
      userName,
      error: error.stack,
    });
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { userName, password, displayName } = req.body;

  try {
    const existingUser = await Database.getRepository(Users).findOne({
      where: { userName }
    });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "Username is already taken." });
    }

    // If username doesn't exist, proceed with creating the new user
    const hash = await bcrypt.hash(password, 10);

    const user = new Users();
    user.userName = userName;
    user.hash = hash;
    user.displayName = displayName;

    await user.save();

    return res.status(200).json({ success: true, message: "User registered successfully." });
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};