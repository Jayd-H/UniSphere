"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const userController_1 = require("../Controllers/userController");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, userController_1.getUserData);
exports.default = router;
