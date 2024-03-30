import { Router } from 'express';
import { getAllSocieties } from '../Controllers/societyController';
import { getPostsInSociety } from '../Controllers/postsController';

const router = Router();

router.get('/posts', getPostsInSociety);
export default router;