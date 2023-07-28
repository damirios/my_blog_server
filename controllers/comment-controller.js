const commentService = require('../services/comment-service');

class CommentController {
    constructor() {}

    async getUserComments(req, res, next) {
        const userId = req.userId;
        try {
            const comments = await commentService.getUserComments(userId);
            res.json(comments);
        } catch (error) {
            return next(error)
        }
    };
    
    async getArticleComments(req, res, next) {
        const articleId = req.articleId;
        try {
            const comments = await commentService.getArticleComments(articleId);
            res.json(comments);
        } catch (error) {
            return next(error);
        }
    }

    async getProjectComments(req, res, next) {
        const projectId = req.projectId;
        try {
            const comments = await commentService.getProjectComments(projectId);
            res.json(comments);
        } catch (error) {
            return next(error);
        }
    }

    async createComment(req, res, next) {
        if (!req.user) {
            throw new Error("Только авторизованные пользователи могут оставлять комментарии");
        }

        const articleId = req.articleId;
        const projectId = req.projectId;
        if (!articleId && !projectId) {
            throw new Error("Контента, к которому вы хотите оставить комментарий, не существует");
        }

        let comment;
        if (articleId) {
            comment = await commentService.createComment(req.body.text, req.user.userId, articleId, 'article');
        } else if (projectId) {
            comment = await commentService.createComment(req.body.text, req.user.userId, projectId, 'project');
        }
        res.json(comment);
    }

    async publishComment(req, res, next) {
        const comment = await commentService.publishComment(req.params.commentId);
        res.json(comment);
    }

    async unpublishComment(req, res, next) {
        const comment = await commentService.unpublishComment(req.params.commentId);
        res.json(comment);
    }

    async deleteComment(req, res, next) {
        try {
            const comment = await commentService.deleteComment(req.params.commentId, req.contentType, req.params.articleId || req.params.projectId);
            res.json(comment);
        } catch (error) {
            return next(error);
        }
    }

    async updateComment(req, res, next) {
        const comment = await commentService.updateComment(req.params.commentId, req.user, req.body.text);
        res.json(comment);
    }
}

module.exports = new CommentController();