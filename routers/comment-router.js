const express = require('express');
const commentController = require('../controllers/comment-controller');
const authorizationCheck = require('../middlewares/auth-middleware');

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
router.post('/', authorizationCheck, commentController.createComment);
router.put('/:commentId', authorizationCheck, commentController.updateComment);
router.delete('/:commentId', authorizationCheck, commentController.deleteComment);

router.post('/:commentId/publish', commentController.publishComment);
router.post('/:commentId/unpublish', commentController.unpublishComment);

module.exports = router;