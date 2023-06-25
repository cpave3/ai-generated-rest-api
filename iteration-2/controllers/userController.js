// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const datastore = require('../datastore');

// Define userController object
const userController = {};

// Define userController methods
userController.getAllUsers = (req, res) => {
  res.status(200).json(datastore.users);
};

userController.getUserById = (req, res) => {
  const user = datastore.users.find((user) => user.id === req.params.id);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.status(200).json(user);
  }
};

userController.createUser = (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
  };
  datastore.users.push(newUser);
  res.status(201).json(newUser);
};

userController.updateUser = (req, res) => {
  const userIndex = datastore.users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1) {
    res.status(404).send('User not found');
  } else {
    const updatedUser = {
      id: req.params.id,
      name: req.body.name,
    };
    datastore.users[userIndex] = updatedUser;
    res.status(200).json(updatedUser);
  }
};

userController.deleteUser = (req, res) => {
  const userIndex = datastore.users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1) {
    res.status(404).send('User not found');
  } else {
    datastore.users.splice(userIndex, 1);
    res.status(204).send();
  }
};

// Export userController object
module.exports = userController;