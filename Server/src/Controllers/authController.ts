import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../Services/databaseService';
import { RowDataPacket } from 'mysql2';

import { User } from '../Data/User';

interface UserPasswordRow extends RowDataPacket {
  hash: string;
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const [rows] = await User.passwordByUsername(username) as RowDataPacket[];
    const userRows = rows as UserPasswordRow[];

    if (userRows.length > 0) {
      const storedHash = userRows[0].hash;
      const isMatch = await bcrypt.compare(password, storedHash);

      if (isMatch) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }

    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password, displayName } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    
    const sql = `INSERT INTO users (username, hash, displayName) VALUES (?, ?, ?)`;
    await pool.query(sql, [username, hash, displayName]);
    
    res.json({ success: true, message: "User registered successfully." });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ success: false, message: "Username is already taken." });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};