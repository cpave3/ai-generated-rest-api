// modules/users/userService.js

// Initialize an array to store user data
const users = [];

// Function to get all users
function getAllUsers() {
  return users;
}

// Function to get a user by ID
function getUserById(id) {
  return users.find(user => user.id === id);
}

// Function to create a new user
function createUser(user) {
  users.push(user);
  return user;
}

// Function to update a user by ID
function updateUser(id, updatedUser) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return users[index];
  }
  return null;
}

// Function to delete a user by ID
function deleteUser(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    return deletedUser[0];
  }
  return null;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};