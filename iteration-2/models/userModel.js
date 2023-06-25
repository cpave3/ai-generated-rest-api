// models/userModel.js

const uuid = require('uuid');

class User {
  constructor(name) {
    this.id = uuid.v4();
    this.name = name;
  }
}

module.exports = User;