import { Request, Response } from 'express';
import { Users } from '../Data/Users';
import { UserSocieties } from '../Data/UserSocieties';
import { Replies } from '../Data/Replies';
import { Posts } from '../Data/Posts';
import { EventReplies } from '../Data/EventReplies';
import { EventPosts } from '../Data/EventPosts';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const societyCount = await UserSocieties.count({ where: { userId } });
    const replyCount = await Replies.count({ where: { user: { id: userId } } });
    const regularPostCount = await Posts.count({ where: { user: { id: userId } } });
    const eventReplyCount = await EventReplies.count({ where: { user: { id: userId } } });
    const eventPostCount = await EventPosts.count({ where: { user: { id: userId } } });

    res.status(200).json({
      success: true,
      data: {
        username: user.userName,
        displayName: user.displayName,
        societyCount,
        replyCount,
        regularPostCount,
        eventReplyCount,
        eventPostCount,
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const changeUsername = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { newUsername, password } = req.body;
    const userId = req.user.id;

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    user.userName = newUsername;
    await user.save();

    res.status(200).json({ success: true, message: "Username changed successfully" });
  } catch (error) {
    console.error("Error changing username:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const changeDisplayName = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { newDisplayName, password } = req.body;
    const userId = req.user.id;

    console.log("newdisplayname",newDisplayName,"password",password, "userid",userId);

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    user.displayName = newDisplayName;
    await user.save();

    res.status(200).json({ success: true, message: "Display name changed successfully" });
  } catch (error) {
    console.error("Error changing display name:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.hash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.hash = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    
    const userId = req.user.id;
    const { password } = req.body;

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    await user.remove();

    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};