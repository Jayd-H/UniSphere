import { body } from 'express-validator'
import { isModuleNamespaceObject } from 'util/types'

export const usernameValidator = [
    body('userName')
        .notEmpty().withMessage("Username cannot be empty")
        .isLength({min: 5, max: 32}).withMessage("Username must be between 5 and 32 characters")
        .isAlphanumeric('en-GB', {ignore: "-_."}).withMessage("Username must be alphanumeric")
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
        .isAlphanumeric('en-GB', {ignore: " "}).withMessage("Display name must be alphanumeric")
        .escape()
]

export const userMessageValidation = [
    body('content')
        .notEmpty().withMessage("Post must contain a message")
        .isLength({min: 1, max: 512}).withMessage("Maximum post content is 512 characters")
        .escape()
]

export const societyValidation = [
    body('societyId')
        .notEmpty().withMessage("Post must contain society ID")
        .isNumeric().withMessage("Society ID must be an integer")
        .escape()
]

export const eventValidation = [
    body('eventType')
        .notEmpty().withMessage("Event post must have a type")
        .isLength({min: 1, max: 32}).withMessage("Maximum event type is 32 characters")
        .isAlphanumeric('en-GB', {ignore: " "}).withMessage("Event type must be alphanumeric")
        .escape(),
    
    body('eventLocation')
        .notEmpty().withMessage("Event post must have a location")
        .isLength({min: 1, max: 64}).withMessage("Maximum event location is 64 characters")
        .isAlphanumeric('en-GB', {ignore: " "}).withMessage("Event location must be alpha numeric")
        .escape(),

   body('eventTime')
    .notEmpty().withMessage("Event time must not be empty")
    .isLength({ min: 1, max: 32 })
    .matches(/^\d{2}\/\d{2}\/\d{2} \d{2}:(00|30)$/).withMessage("Event time must be in the format 'DD/MM/YY HH:mm' with minutes being either 00 or 30")
    .custom((value) => {
      const [date, time] = value.split(' ');
      const [day, month, year] = date.split('/');
      const [hours, minutes] = time.split(':');

      const eventDate = new Date(`20${year}-${month}-${day}T${hours}:${minutes}:00`);

      if (isNaN(eventDate.getTime())) {
        throw new Error('Invalid event time');
      }

      return true;
    }),
]