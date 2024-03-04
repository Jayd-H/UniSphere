import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../Services/databaseService';
import { RowDataPacket } from 'mysql2';

interface UserPasswordRow extends RowDataPacket {
  hash: string;
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const sql = `SELECT hash FROM passwords WHERE username = ?`;
    const [rows] = await pool.query(sql, [username]) as RowDataPacket[];
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