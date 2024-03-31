import { Request, Response } from 'express';
import { Replies } from '../Data/Replies';
import { Users } from '../Data/Users';
import { Posts } from '../Data/Posts';
import { UserLikesReplies } from '../Data/UserLikesReplies';

// Create a new reply
export const createReply = async (req: Request, res: Response) => {
  try {
    const { content, timestamp } = req.body;
    const postId = parseInt(req.params.postId);
    const userId = req.user.id;

    const post = await Posts.findOneBy({ id: postId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const reply = Replies.create({ content, timestamp, post, user: { id: userId } });
    await Replies.save(reply);

    res.json(reply);
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Like a reply
export const likeReply = async (req: Request, res: Response) => {
  try {
    const replyId = parseInt(req.params.replyId);
    const userId = req.user.id;

    const reply = await Replies.findOneBy({ id: replyId });
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    const like = await UserLikesReplies.findOne({ where: { replyId, userId } });
    if (like) {
      return res.status(400).json({ message: 'Reply already liked' });
    }

    const newLike = UserLikesReplies.create({ replyId, userId });
    await newLike.save();

    res.json({ message: 'Reply liked successfully' });
  } catch (error) {
    console.error('Error liking reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Unlike a reply
export const unlikeReply = async (req: Request, res: Response) => {
  try {
    const replyId = parseInt(req.params.replyId);
    const userId = req.user.id;

    const like = await UserLikesReplies.findOne({ where: { replyId, userId } });
    if (!like) {
      return res.status(400).json({ message: 'Reply not liked' });
    }

    await like.remove();

    res.json({ message: 'Reply unliked successfully' });
  } catch (error) {
    console.error('Error unliking reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
