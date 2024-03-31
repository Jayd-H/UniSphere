import { Request, Response } from 'express';
import { EventPosts } from '../Data/EventPosts';
import { Users } from '../Data/Users';
import { Societies } from '../Data/Societies';
import { UserLikesEventPosts } from '../Data/UserLikesEventPosts';
import { In } from 'typeorm';

// Fetch event posts for given society IDs
export const fetchEventPosts = async (req: Request, res: Response) => {
  try {
    const societyIds = req.query.societyIds?.toString().split(',').map(Number);
    const eventPosts = await EventPosts.find({
        where: {
            societyId: societyIds ? In(societyIds) : undefined,
        },
        relations: ['user', 'society'],
    });
    res.json(eventPosts);
  } catch (error) {
    console.error('Error fetching event posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Like an event post
export const likeEventPost = async (req: Request, res: Response) => {
  try {
    const eventPostId = parseInt(req.params.eventPostId);
    const userId = req.user.id;

    const eventPost = await EventPosts.findOneBy({ id: eventPostId });
    if (!eventPost) {
      return res.status(404).json({ message: 'Event post not found' });
    }

    const like = await UserLikesEventPosts.findOne({ where: { eventPostId, userId } });
    if (like) {
      return res.status(400).json({ message: 'Event post already liked' });
    }

    const newLike = UserLikesEventPosts.create({ eventPostId, userId });
    await newLike.save();

    res.json({ message: 'Event post liked successfully' });
  } catch (error) {
    console.error('Error liking event post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unlike an event post
export const unlikeEventPost = async (req: Request, res: Response) => {
  try {
    const eventPostId = parseInt(req.params.eventPostId);
    const userId = req.user.id;

    const like = await UserLikesEventPosts.findOne({ where: { eventPostId, userId } });
    if (!like) {
      return res.status(400).json({ message: 'Event post not liked' });
    }

    await like.remove();

    res.json({ message: 'Event post unliked successfully' });
  } catch (error) {
    console.error('Error unliking event post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
