// Import necessary modules and files
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const datastore = require('../datastore');
const userController = require('../controllers/userController');

// Define routes for User resource
router.get('/users', userController.getAllUsers);

router.get('/users/:id', userController.getUserById);

router.post('/users', userController.createUser);

router.put('/users/:id', userController.updateUser);

router.delete('/users/:id', userController.deleteUser);

// Export router
module.exports = router;