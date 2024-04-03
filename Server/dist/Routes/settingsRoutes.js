"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const settingsController_1 = require("../Controllers/settingsController");
const router = (0, express_1.Router)();
router.get('/user', authMiddleware_1.authenticateToken, settingsController_1.getUserDetails);
router.put('/username', authMiddleware_1.authenticateToken, settingsController_1.changeUsername);
router.put('/displayname', authMiddleware_1.authenticateToken, settingsController_1.changeDisplayName);
router.put('/password', authMiddleware_1.authenticateToken, settingsController_1.changePassword);
router.delete('/account', authMiddleware_1.authenticateToken, settingsController_1.deleteAccount);
exports.default = router;
