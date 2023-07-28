const CommentModel = require('../models/comment');
const UserModel = require('../models/user');
const ArticleModel = require('../models/article');
const ProjectModel = require('../models/project');

class CommentService {
    constructor() {}

    getUserComments(userId) {
        return CommentModel.find({author: userId});
    }

    getArticleComments(articleId) {
        return CommentModel.find({articleId});
    }

    getProjectComments(projectId) {
        return CommentModel.find({projectId});
    }

    async createComment(text, author, contentId, contentType) { // contentType = articleI|| project
        let content;
        if (contentType === 'article') {
            content = await ArticleModel.findById(contentId);
        } else if (contentType === 'project') {
            content = await ProjectModel.findById(contentId);
        }

        if (!content) {
            throw new Error("Не найден контент, к которому вы пытаетесь оставить комментарий");
        }

        const contentTypeId = contentType + 'Id';
        const comment = await CommentModel.create({
            author, 
            [contentTypeId]: contentId,
            text,
            isModerated: false,
            creationDate: new Date(),
        });

        content.comments.push(comment.id);
        await content.save();

        return comment;
    }

    async updateComment(commentId, user, text) {
        const comment = await CommentModel.findById(commentId).populate('author');
        if (!user || !comment || user.userId !== comment.author.id) {
            throw new Error("У вас нет доступа к редактированию этого комментария");
        }

        comment.isModerated = false;
        comment.text = text;
        comment.save();

        return comment;
    }

    async deleteComment(commentId, contentType, contentId) {
        let content;
        if (contentType === 'article') {
            content = await ArticleModel.findById(contentId).populate("comments");
        } else if (contentType === 'project') {
            content = await ProjectModel.findById(contentId).populate("comments");
        }
        const commentIndex = content.comments.findIndex((el) => el === commentId);
        content.comments.splice(commentIndex, 1);
        await content.save();

        const comment = await CommentModel.findByIdAndDelete(commentId);
        return comment;
    }

    async publishComment(id) {
        const comment = await CommentModel.findById(id);
        comment.isModerated = true;
        await comment.save();
        return comment;
    }

    async unpublishComment(id) {
        const comment = await CommentModel.findById(id);
        comment.isModerated = false;
        await comment.save();
        return comment;
    }
}

module.exports = new CommentService();