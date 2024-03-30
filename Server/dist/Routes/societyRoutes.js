"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const societyController_1 = require("../Controllers/societyController");
const societyController_2 = require("../Controllers/societyController");
const societyController_3 = require("../Controllers/societyController");
const router = (0, express_1.Router)();
router.get('/all', societyController_2.getAllSocieties);
router.get('/user', authMiddleware_1.authenticateToken, societyController_1.getUserSocieties);
router.get('/One', societyController_3.getSpecificSociety);
exports.default = router;
