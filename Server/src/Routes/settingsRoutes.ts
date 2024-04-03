import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import {
  getUserDetails,
  changeUsername,
  changeDisplayName,
  changePassword,
  deleteAccount,
} from '../Controllers/settingsController';

const router = Router();

router.get('/user', authenticateToken, getUserDetails);
router.put('/username', authenticateToken, changeUsername);
router.put('/displayname', authenticateToken, changeDisplayName);
router.put('/password', authenticateToken, changePassword);
router.delete('/account', authenticateToken, deleteAccount);

export default router;