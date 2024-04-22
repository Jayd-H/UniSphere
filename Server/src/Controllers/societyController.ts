import { Request, Response } from 'express';
import { UserSocieties } from '../Data/UserSocieties';
import { Societies } from '../Data/Societies';
import { Database } from '../Data/data-source';
import { Posts } from '../Data/Posts';
import { UserLikesPosts } from '../Data/UserLikesPosts';
import { UserLikesReplies } from '../Data/UserLikesReplies';


export const getAllSocieties = async (req: Request, res: Response) => {
  try {
    const societies = await Societies.find();
    res.status(200).json({ success: true, data: societies });
  } catch (error: any) {
    console.error("Error fetching societies:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getRecommendedSocieties = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.query.userId as string);

    // Find the societies the user has not joined
    const userSocieties = await UserSocieties.find({ where: { userId } });
    const joinedSocietyIds = userSocieties.map((us) => us.societyId);

    const recommendedSocieties = await Societies.createQueryBuilder("society")
      .where("society.id NOT IN (:...joinedSocietyIds)", { joinedSocietyIds })
      .orderBy("RAND()")
      .take(5)
      .getMany();

    res.status(200).json({ success: true, data: recommendedSocieties });
  } catch (error) {
    console.error("Error fetching recommended societies:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserSocieties = async (req: Request, res: Response) => {
  try {
    const userSocieties = await UserSocieties.find({ where: { userId: req.user.id } });
    if (!userSocieties || userSocieties.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    const societyIds = userSocieties.map((us) => us.societyId);
    const societies = [];

    for (const societyId of societyIds) {
      const society = await Societies.findOne({ where: { id: societyId } });
      if (society) {
        societies.push(society);
      } else {
        console.warn(`Society with id ${societyId} not found`);
      }
    }

    res.status(200).json({ success: true, data: societies });
    return societies;
  } catch (error) {
    console.error("Error fetching user societies:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSpecificSociety = async (req: Request, res: Response) => {
  try {
    const societyId = req.body?.societyId || req.query?.societyId;

    // Find society
    const society = await Database.getRepository(Societies).findOne({ where: { id: societyId } });

    // Handle non-existent society
    if (!society) {
      return res.status(404).json({ success: false, message: "Society not found" });
    }

    // Return retrieved society
    res.status(200).json({ success: true, data: society });
  } catch (error) {
    console.error("Error fetching society:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSocietyPosts = async (req: Request, res: Response) => {
  try {
    const societyId = parseInt(req.params.societyId);
    const userId = req.user.id;

    const posts = await Posts.find({
      where: { society: { id: societyId } },
      relations: ["user", "society", "replies", "replies.user"],
      order: { timestamp: "DESC" },
      take: 25,
    });

    const postsWithData = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await UserLikesPosts.count({ where: { post: { id: post.id } } });
        const userLiked = await UserLikesPosts.findOne({ where: { post: { id: post.id }, user: { id: userId } } });
        const repliesWithData = await Promise.all(
          post.replies.map(async (reply) => {
            const replyLikesCount = await UserLikesReplies.count({ where: { reply: { id: reply.id } } });
            const userLikedReply = await UserLikesReplies.findOne({ where: { reply: { id: reply.id }, user: { id: userId } } });
            return {
              replyId: reply.id,
              replyContent: reply.content,
              timestamp: reply.timestamp,
              user: {
                id: reply.user.id,
                displayName: reply.user.displayName,
              },
              likesCount: replyLikesCount,
              isLiked: !!userLikedReply,
            };
          })
        );
        repliesWithData.sort((a, b) => b.likesCount - a.likesCount);
        return {
          postId: post.id,
          postContent: post.content,
          timestamp: post.timestamp,
          societyId: post.society.id,
          societyName: post.society.societyName,
          user: {
            id: post.user.id,
            displayName: post.user.displayName,
          },
          likesCount,
          isLiked: !!userLiked,
          replyCount: post.replies.length,
          replies: repliesWithData,
        };
      })
    );

    res.json(postsWithData);
  } catch (error) {
    console.error("Error fetching society posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const joinSociety = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const societyId = parseInt(req.params.societyId);

    const userSociety = new UserSocieties();
    userSociety.userId = userId;
    userSociety.societyId = societyId;
    await userSociety.save();

    res.status(200).json({ success: true, message: "Joined society successfully" });
  } catch (error) {
    console.error("Error joining society:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const leaveSociety = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const societyId = parseInt(req.params.societyId);

    const result = await UserSocieties.delete({ userId, societyId });

    if (result.affected === 0) {
      return res.status(404).json({ success: false, message: "User or society not found" });
    }

    res.status(200).json({ success: true, message: "Left society successfully" });
  } catch (error) {
    console.error("Error leaving society:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSocietyMemberCount = async (req: Request, res: Response) => {
  try {
    const societyId = parseInt(req.params.societyId);

    const memberCount = await UserSocieties.count({ where: { societyId } });

    res.status(200).json({ count: memberCount });
  } catch (error) {
    console.error("Error fetching society member count:", error);
    res.status(500).json({ message: "Server error" });
  }
};