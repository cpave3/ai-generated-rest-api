// modules/comments/commentService.js

const comments = [];

function getAllComments() {
  return comments;
}

function getCommentById(id) {
  return comments.find(comment => comment.id === id);
}

function createComment(comment) {
  comments.push(comment);
  return comment;
}

function updateComment(id, updatedComment) {
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments[index] = updatedComment;
    return updatedComment;
  }
  return null;
}

function deleteComment(id) {
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};