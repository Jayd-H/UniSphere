import { Request, Response } from 'express';
import { EventReplies } from '../Data/EventReplies';
import { Users } from '../Data/Users';
import { EventPosts } from '../Data/EventPosts';
import { UserLikesEventReplies } from '../Data/UserLikesEventReplies';

export const createEventReply = async (req: Request, res: Response) => {
  try {
    const { content, timestamp } = req.body;
    const eventPostId = parseInt(req.params.eventPostId);
    const userId = req.user.id;

    const eventPost = await EventPosts.findOneBy({ id: eventPostId });
    if (!eventPost) {
      return res.status(404).json({ message: 'Event post not found' });
    }

    const reply = EventReplies.create({ content, timestamp, eventPost, user: { id: userId } });
    await EventReplies.save(reply);

    res.json({ replyId: reply.id });
  } catch (error) {
    console.error('Error creating event reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const likeEventReply = async (req: Request, res: Response) => {
  try {
    const replyId = parseInt(req.params.replyId);
    const userId = req.user.id;

    const reply = await EventReplies.findOne({ where: { id: replyId } });
    if (!reply) {
      return res.status(404).json({ message: 'Event reply not found' });
    }

    const existingLike = await UserLikesEventReplies.findOne({ where: { eventReply: { id: replyId }, user: { id: userId } } });
    if (existingLike) {
      return res.status(400).json({ message: 'Event reply already liked' });
    }

    const newLike = UserLikesEventReplies.create({ eventReply: reply, user: { id: userId } });
    await UserLikesEventReplies.save(newLike);

    res.json({ message: 'Event reply liked successfully' });
  } catch (error) {
    console.error('Error liking event reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const unlikeEventReply = async (req: Request, res: Response) => {
  try {
    const replyId = parseInt(req.params.replyId);
    const userId = req.user.id;

    const like = await UserLikesEventReplies.findOne({ where: { eventReply: { id: replyId }, user: { id: userId } } });
    if (!like) {
      return res.status(400).json({ message: 'Event reply not liked' });
    }

    await UserLikesEventReplies.remove(like);

    res.json({ message: 'Event reply unliked successfully' });
  } catch (error) {
    console.error('Error unliking event reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
};