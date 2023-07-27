const express = require('express');
const contentController = require('../controllers/content-controller');

const router = express.Router();

// router.get('/', authorizationCheck, userController.getUsers);
// router.post('/login', userController.login);
// router.get('/refresh', userController.refresh);
// router.get('/:id', userController.getUserById);
// router.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
router.post('/', contentController.createContent);

module.exports = router;