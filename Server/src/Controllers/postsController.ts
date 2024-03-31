import { In } from 'typeorm';
import { Request, Response } from 'express';
import { Posts } from '../Data/Posts';
import { Societies } from '../Data/Societies';
import { UserLikesPosts } from '../Data/UserLikesPosts';
import { Replies } from '../Data/Replies';
import { UserLikesReplies } from '../Data/UserLikesReplies';


export const getPostsInAllSocieties = async (req: Request, res: Response) => {
    try {
    
      const societies = await Societies.find();
      const societyIds = societies.map(us => us.id);
      const posts = [];
      for (const societyId of societyIds) {
        const post = await Posts.find({ where: { id: societyId } });
        if (post) {
          posts.push(post);
        }
      } 
      res.status(200).json({ success: true, data: posts });
    } catch (error: any) {
      console.error("Error fetching posts for societies:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

export const getPostsInSociety = async (req: Request, res: Response) => {
  try {
    const societyIdsString = req.query.societyIds?.toString() || '';
    const societyIds = societyIdsString.split(',').map(Number).filter(id => !isNaN(id));
    const userId = req.user.id;

    const whereClause = societyIds.length > 0 ? { society: { id: In(societyIds) } } : {};

    const posts = await Posts.find({
      where: whereClause,
      relations: ['user', 'society', 'replies', 'replies.user'],
    });


    const postsWithData = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await UserLikesPosts.count({ where: { postId: post.id } });
        const userLiked = await UserLikesPosts.findOne({ where: { postId: post.id, userId } });

        const repliesWithData = await Promise.all(
          post.replies.map(async (reply) => {
            const replyLikesCount = await UserLikesReplies.count({ where: { replyId: reply.id } });
            const userLikedReply = await UserLikesReplies.findOne({ where: { replyId: reply.id, userId } });

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
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, societyId, timestamp } = req.body;
    const userId = req.user.id;

    const society = await Societies.findOne({ where: { id: societyId } });
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }

    const post = Posts.create({ content, society, user: { id: userId }, timestamp });
    await Posts.save(post);

    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

// Like a post
export const likePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = req.user.id;

    const post = await Posts.findOneBy({ id: postId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const like = await UserLikesPosts.findOne({ where: { postId, userId } });
    if (like) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    const newLike = UserLikesPosts.create({ postId, userId });
    await newLike.save();

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unlike a post
export const unlikePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = req.user.id;

    const like = await UserLikesPosts.findOne({ where: { postId, userId } });
    if (!like) {
      return res.status(400).json({ message: 'Post not liked' });
    }

    await like.remove();

    res.json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
