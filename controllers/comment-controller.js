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
    
    // createUser = async (req, res, next) => {
    //     const {login, password, firstname, lastname} = req.body;
    //     try {
    //         const user = await userService.createUser({login, password, firstname, lastname});
    //         res.json(user);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }
    
    // updateUser = async (req, res, next) => {
    //     const {login, password, firstname, lastname} = req.body;
    //     const {id} = req.params;
    //     try {
    //         const user = await userService.updateUser({login, password, firstname, lastname}, id);
    //         res.json(user);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }
}

module.exports = new CommentController();