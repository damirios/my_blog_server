const express = require('express');
const contentController = require('../controllers/content-controller');

const router = express.Router();

// router.get('/', authorizationCheck, userController.getUsers);
// router.post('/login', userController.login);
// router.get('/refresh', userController.refresh);
// router.get('/:id', userController.getUserById);
// router.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
router.get('/', (req, res, next) => {
    const contentType = req.contentType;
    if (contentType === 'article') {
        contentController.getArticles(req, res, next);
    } else if (contentType === 'project') {
        contentController.getProjects(req, res, next);
    }
});
router.get('/:id', (req, res, next) => {
    const contentType = req.contentType;
    if (contentType === 'article') {
        contentController.getArticleById(req, res, next);
    } else if (contentType === 'project') {
        contentController.getProjectById(req, res, next);
    }
});
router.post('/', contentController.createContent);
router.delete('/:id', contentController.deleteContent);

module.exports = router;