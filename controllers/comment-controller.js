const commentService = require('../services/comment-service');

class CommentController {
    constructor() {}

    getUserComments = async (req, res, next) => {
        const userId = req.userId;
        try {
            const comments = await commentService.getUserComments(userId);
            res.json(comments);
        } catch (error) {
            return next(error)
        }
    };
    
    getArticleComments = async (req, res, next) => {
        const articleId = req.articleId;
        try {
            const comments = await commentService.getArticleComments(articleId);
            res.json(comments);
        } catch (error) {
            return next(error);
        }
    }

    getProjectComments = async (req, res, next) => {
        const projectId = req.projectId;
        try {
            const comments = await commentService.getProjectComments(projectId);
            res.json(comments);
        } catch (error) {
            return next(error);
        }
    }

    createComment = async (req, res, next) => {
        if (!req.user) {
            throw new Error("Только авторизованные пользователи могут оставлять комментарии");
        }

        const articleId = req.articleId;
        const projectId = req.projectId;
        if (!articleId && !projectId) {
            throw new Error("Контента, к которому вы хотите оставить комментарий, не существует");
        }

        if (articleId) {
            const comment = await commentService.createComment(req.body.text, req.user.id, articleId, 'articleId');
        } else if (projectId) {
            const comment = await commentService.createComment(req.body.text, req.user.id, articleId, 'projectId');
        }
        res.json(comment);
    }
}

module.exports = new CommentController();