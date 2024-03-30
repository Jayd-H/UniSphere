import { Request, Response } from 'express';
import { Posts } from '../Data/Posts';
import { UserSocieties } from '../Data/UserSocieties';
import { Societies } from '../Data/Societies';


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
      const {userId} = req.body;
  
     
      const userSocieties = await UserSocieties.findBy(userId);

      const societyIds = userSocieties.map((society) => society.id);
  
     
      const posts = await Promise.all(
        societyIds.map((id) => Posts.find({ where: { societyId: id } }))
      );
  
     
      const allPosts = posts.flat();
  
      
      res.status(200).json({ success: true, data: allPosts });
    } catch (error) {
      console.error("Error fetching posts for societies:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };