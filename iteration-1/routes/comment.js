// routes/comment.js

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

// GET all comments
router.get('/', commentController.getAllComments);

// GET a specific comment by id
router.get('/:id', commentController.getCommentById);

// POST a new comment
router.post('/', authMiddleware, validationMiddleware, commentController.createComment);

// PUT update a comment by id
router.put('/:id', authMiddleware, validationMiddleware, commentController.updateComment);

// DELETE a comment by id
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;