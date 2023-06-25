// Importing the required modules and models
const Comment = require('../models/commentModel');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// Defining the commentController object
const commentController = {};

// Function to create a new comment
commentController.createComment = async (req, res) => {
  try {
    const { content, author_id, ticket_id, parent_id } = req.body;

    // Check if the ticket exists
    const ticket = await Ticket.findById(ticket_id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if the parent comment exists
    let parentComment;
    if (parent_id) {
      parentComment = await Comment.findById(parent_id);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
    }

    // Check if the user exists
    const user = await User.findById(author_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the new comment
    const comment = new Comment({
      content,
      author_id,
      ticket_id,
      parent_id,
    });

    // Save the comment to the database
    await comment.save();

    // Add the comment to the ticket's comments array
    ticket.comments.push(comment._id);
    await ticket.save();

    // Add the comment to the parent comment's replies array
    if (parentComment) {
      parentComment.replies.push(comment._id);
      await parentComment.save();
    }

    // Return the new comment
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to get all comments
commentController.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to get a single comment by ID
commentController.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to update a comment
commentController.updateComment = async (req, res) => {
  try {
    const { content } = req.body;

    // Check if the comment exists
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Update the comment
    comment.content = content;
    await comment.save();

    // Return the updated comment
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to delete a comment
commentController.deleteComment = async (req, res) => {
  try {
    // Check if the comment exists
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment from the ticket's comments array
    const ticket = await Ticket.findById(comment.ticket_id);
    ticket.comments = ticket.comments.filter(
      (commentId) => commentId.toString() !== comment._id.toString()
    );
    await ticket.save();

    // Remove the comment from the parent comment's replies array
    if (comment.parent_id) {
      const parentComment = await Comment.findById(comment.parent_id);
      parentComment.replies = parentComment.replies.filter(
        (replyId) => replyId.toString() !== comment._id.toString()
      );
      await parentComment.save();
    }

    // Delete the comment
    await comment.remove();

    // Return success message
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Exporting the commentController object
module.exports = commentController;