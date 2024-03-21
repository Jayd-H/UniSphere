"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const societyController_1 = require("../Controllers/societyController");
const router = (0, express_1.Router)();
router.get('/all', societyController_1.getAllSocieties);
exports.default = router;
