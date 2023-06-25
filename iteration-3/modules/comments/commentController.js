// modules/comments/commentController.js

const express = require('express');
const commentService = require('./commentService');

const router = express.Router();

router.get('/', (req, res) => {
  const comments = commentService.getAllComments();
  res.send(comments);
});

router.get('/:id', (req, res) => {
  const comment = commentService.getCommentById(req.params.id);
  res.send(comment);
});

router.post('/', (req, res) => {
  const { content, author_id, ticket_id, parent_id } = req.body;
  const newComment = commentService.createComment(content, author_id, ticket_id, parent_id);
  res.send(newComment);
});

router.put('/:id', (req, res) => {
  const { content, author_id, ticket_id, parent_id } = req.body;
  const updatedComment = commentService.updateComment(req.params.id, content, author_id, ticket_id, parent_id);
  res.send(updatedComment);
});

router.delete('/:id', (req, res) => {
  commentService.deleteComment(req.params.id);
  res.sendStatus(204);
});

module.exports = router;