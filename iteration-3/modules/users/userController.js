// modules/users/userController.js

const express = require('express');
const router = express.Router();
const userService = require('./userService');

router.get('/', (req, res) => {
  const users = userService.getAllUsers();
  res.send(users);
});

router.get('/:id', (req, res) => {
  const user = userService.getUserById(req.params.id);
  res.send(user);
});

router.post('/', (req, res) => {
  const user = req.body;
  userService.createUser(user);
  res.send('User created successfully');
});

router.put('/:id', (req, res) => {
  const user = req.body;
  userService.updateUser(req.params.id, user);
  res.send('User updated successfully');
});

router.delete('/:id', (req, res) => {
  userService.deleteUser(req.params.id);
  res.send('User deleted successfully');
});

module.exports = router;