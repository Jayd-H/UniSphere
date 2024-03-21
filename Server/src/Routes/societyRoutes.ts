import { Router } from 'express';
import { getAllSocieties } from '../Controllers/societyController';

const router = Router();

router.get('/all', getAllSocieties);

export default router;