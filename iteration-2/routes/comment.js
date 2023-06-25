// Import necessary modules
const express = require('express');
const router = express.Router();

// Import the comment controller
const commentController = require('../controllers/commentController');

// Define routes for comments
router.get('/comments', commentController.getAllComments);
router.get('/comments/:id', commentController.getCommentById);
router.post('/comments', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

// Export the router
module.exports = router;