const express = require('express');

const userController = require('../controllers/user-controller');
const authorizationCheck = require('../middlewares/auth-middleware');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

module.exports = router;