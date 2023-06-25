// models/commentModel.js

const uuid = require('uuid');

class Comment {
  constructor(content, author_id, ticket_id, parent_id) {
    this.id = uuid.v4();
    this.content = content;
    this.author_id = author_id;
    this.ticket_id = ticket_id;
    this.parent_id = parent_id;
  }
}

module.exports = Comment;