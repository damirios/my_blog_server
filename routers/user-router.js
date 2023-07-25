const express = require('express');
const { getUsers, createUser, getUserById, updateUser } = require('../controllers/user-controller');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

module.exports = router;