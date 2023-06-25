//middlewares/validationMiddleware.js

const { body, validationResult } = require('express-validator');

const validateUser = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
  ];
};

const validateTicket = () => {
  return [
    body('summary').notEmpty().withMessage('Summary is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('author_id').notEmpty().withMessage('Author ID is required'),
  ];
};

const validateComment = () => {
  return [
    body('content').notEmpty().withMessage('Content is required'),
    body('author_id').notEmpty().withMessage('Author ID is required'),
    body('ticket_id').notEmpty().withMessage('Ticket ID is required'),
    body('parent_id').optional(),
  ];
};

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateUser,
  validateTicket,
  validateComment,
  validationMiddleware,
};