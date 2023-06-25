// models/ticketModel.js

const uuid = require('uuid');

class Ticket {
  constructor(summary, description, author_id) {
    this.id = uuid.v4();
    this.summary = summary;
    this.description = description;
    this.author_id = author_id;
  }
}

module.exports = Ticket;