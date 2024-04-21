"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidation = exports.societyValidation = exports.userMessageValidation = exports.displayNameValidator = exports.passwordValidator = exports.usernameValidator = void 0;
const express_validator_1 = require("express-validator");
exports.usernameValidator = [
    (0, express_validator_1.body)('userName')
        .notEmpty().withMessage("Username cannot be empty")
        .isLength({ min: 5, max: 32 }).withMessage("Username must be between 5 and 32 characters")
        .isAlphanumeric().withMessage("Username must be alphanumeric")
        .escape()
];
exports.passwordValidator = [
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage("Password cannot be empty")
        .isLength({ min: 5, max: 32 }).withMessage("Password must be between 5 and 32 characters")
        .escape()
];
exports.displayNameValidator = [
    (0, express_validator_1.body)('displayName')
        .notEmpty().withMessage("Display name cannot be empty")
        .isLength({ min: 5, max: 64 }).withMessage("Display name must be between 5 and 64 characters")
        .isAlphanumeric().withMessage("Display name must be alphanumeric")
        .escape()
];
exports.userMessageValidation = [
    (0, express_validator_1.body)('content')
        .notEmpty().withMessage("Post must contain a message")
        .isLength({ min: 1, max: 512 }).withMessage("Maximum post content is 512 characters")
        .escape()
];
exports.societyValidation = [
    (0, express_validator_1.body)('societyId')
        .notEmpty().withMessage("Post must contain society ID")
        .isNumeric().withMessage("Society ID must be an integer")
        .escape()
];
exports.eventValidation = [
    (0, express_validator_1.body)('eventType')
        .notEmpty().withMessage("Event post must have a type")
        .isLength({ min: 1, max: 32 }).withMessage("Maximum event type is 32 characters")
        .isAlphanumeric().withMessage("Event type must be alphanumeric")
        .escape(),
    (0, express_validator_1.body)('eventLocation')
        .notEmpty().withMessage("Event post must have a location")
        .isLength({ min: 1, max: 64 }).withMessage("Maximum event location is 64 characters")
        .isAlphanumeric().withMessage("Event location must be alpha numeric")
        .escape(),
    (0, express_validator_1.body)('eventTime')
        .notEmpty().withMessage("Event time must not be empty")
        .isLength({ min: 1, max: 32 })
        .isTime({ hourFormat: 'hour24', mode: 'default' }).withMessage("Event time must be a valid date time")
        .escape()
];
