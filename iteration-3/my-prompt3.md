Create a RESTful CRUD API using express.js.

## Resources
The API has the following resources and fields:

### User

- id
- name

### Ticket

- id
- summary
- description
- author_id

### Comment

- id
- content
- author_id
- ticket_id
- parent_id

## Module structure

Each module (users, tickets, and comments) should use the following structure. "User" is used as an example, and the name should be changed appropriately for each given module.

- modules
  - users
    - userRoutes.js
    - userController.js
    - userService.js

### userRoutes.js

This file should be used in the `index.js` like so:

```js
// index.js
app.use('/users', userRoutes);
```

The file itself should contain mappings between a given endpoint and the controller method that serves it, like so:

```js
// modules/users/userRoutes.js
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
```

### userController.js

This file should serve as an HTTP adapter, and should invoke business logic from the userService. This file should declare the following functions:

- getAllUsers
- getUserById
- createUser
- updateUser
- deleteUser

Each of these functions should invoke the function of the same name from the corresponding service.

### userService.js

This file should house the business logic for the module. This file should declare the following functions:

- getAllUsers
- getUserById
- createUser
- updateUser
- deleteUser


## Adjustments

- Do not validate requests or responses
- Do not use a database, just use an array as a datastore for now

"""
