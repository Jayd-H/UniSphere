import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { displayNameValidator, passwordValidator, usernameValidator } from '../Middleware/validationMiddleware';
import {
  getUserDetails,
  changeUsername,
  changeDisplayName,
  changePassword,
  deleteAccount,
} from '../Controllers/settingsController';

const router = Router();

router.get('/user', authenticateToken, getUserDetails);
router.put('/username', authenticateToken, usernameValidator, changeUsername);
router.put('/displayname', authenticateToken, displayNameValidator, changeDisplayName);
router.put('/password', authenticateToken, passwordValidator, changePassword);
router.delete('/account', authenticateToken, deleteAccount);

export default router;