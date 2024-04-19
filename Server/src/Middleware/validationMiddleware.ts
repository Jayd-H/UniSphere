import { body } from 'express-validator'

export const usernameValidator = [
    body('userName')
        .notEmpty().withMessage("Username cannot be empty")
        .isLength({min: 5, max: 32}).withMessage("Username must be between 5 and 32 characters")
        .isAlphanumeric().withMessage("Username must be alphanumeric")
        .escape()
]

export const passwordValidator = [
    body('password')
        .notEmpty().withMessage("Password cannot be empty")
        .isLength({min: 5, max: 32}).withMessage("Password must be between 5 and 32 characters")
        .escape()
]


export const displayNameValidator = [
    body('displayName')
        .notEmpty().withMessage("Display name cannot be empty")
        .isLength({min: 5, max: 64}).withMessage("Display name must be between 5 and 64 characters")
        .isAlphanumeric().withMessage("Display name must be alphanumeric")
        .escape()
]