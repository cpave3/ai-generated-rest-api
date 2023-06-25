// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

// GET all users
router.get('/', authMiddleware, userController.getAllUsers);

// GET user by id
router.get('/:id', authMiddleware, userController.getUserById);

// POST create new user
router.post('/', validationMiddleware, userController.createUser);

// PUT update user by id
router.put('/:id', authMiddleware, validationMiddleware, userController.updateUserById);

// DELETE user by id
router.delete('/:id', authMiddleware, userController.deleteUserById);

module.exports = router;