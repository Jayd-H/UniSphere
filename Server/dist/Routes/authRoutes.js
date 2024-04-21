"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controllers/authController");
const authController_2 = require("../Controllers/authController");
const validationMiddleware_1 = require("../Middleware/validationMiddleware");
const router = (0, express_1.Router)();
router.post('/login', validationMiddleware_1.usernameValidator, validationMiddleware_1.passwordValidator, authController_1.login);
router.post('/register', validationMiddleware_1.usernameValidator, validationMiddleware_1.passwordValidator, validationMiddleware_1.displayNameValidator, authController_2.register);
exports.default = router;
