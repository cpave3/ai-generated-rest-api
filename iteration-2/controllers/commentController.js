const uuid = require('uuid');
const datastore = require('../datastore');
const ticketModel = require('../models/ticketModel');

const commentController = {
  getAllComments: (req, res) => {
    const comments = datastore.comments;
    res.status(200).json(comments);
  },

  getCommentById: (req, res) => {
    const commentId = req.params.id;
    const comment = datastore.comments.find(comment => comment.id === commentId);
    if (!comment) {
      res.status(404).send(`Comment with ID ${commentId} does not exist.`);
    } else {
      res.status(200).json(comment);
    }
  },

  createComment: (req, res) => {
    const { content, author_id, ticket_id, parent_id } = req.body;
    const newComment = {
      id: uuid.v4(),
      content,
      author_id,
      ticket_id,
      parent_id
    };
    datastore.comments.push(newComment);
    res.status(201).json(newComment);
  },

  updateComment: (req, res) => {
    const commentId = req.params.id;
    const { content, author_id, ticket_id, parent_id } = req.body;
    const commentIndex = datastore.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
      res.status(404).send(`Comment with ID ${commentId} does not exist.`);
    } else {
      const updatedComment = {
        id: commentId,
        content,
        author_id,
        ticket_id,
        parent_id
      };
      datastore.comments[commentIndex] = updatedComment;
      res.status(200).json(updatedComment);
    }
  },

  deleteComment: (req, res) => {
    const commentId = req.params.id;
    const commentIndex = datastore.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
      res.status(404).send(`Comment with ID ${commentId} does not exist.`);
    } else {
      const deletedComment = datastore.comments.splice(commentIndex, 1)[0];
      ticketModel.removeCommentFromTicket(deletedComment.ticket_id, commentId);
      res.status(204).send();
    }
  }
};

module.exports = commentController;