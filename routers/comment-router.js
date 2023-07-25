const express = require('express');
const commentController = require('../controllers/comment-controller');

const router = express.Router();

router.get('/', (req, res, next) => {
    if (req.userId) {
        commentController.getUserComments(req, res, next);
    } else if (req.articleId) {
        commentController.getArticleComments(req, res, next);
    } else if (req.projectId) {
        commentController.getProjectComments(req, res, next);
    }
});

module.exports = router;