"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settingsController_1 = require("../Controllers/settingsController");
const router = (0, express_1.Router)();
router.post('/pc', settingsController_1.changePassword);
exports.default = router;
