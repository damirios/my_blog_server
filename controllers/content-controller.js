const contentService = require('../services/content-service');

class ContentController {
    constructor() {}

    async createContent(req, res, next) {
        try {
            let content;
            if (req.contentType === 'article') {
                const {title, text, poster} = req.body;
                const contentDto = {title, text, poster, publicationDate: new Date(), likes: 0, dislikes: 0};
                content = await contentService.createContent(contentDto, 'article');
            } else if (req.contentType === 'project') {
                const {title, description, poster, devstack, link} = req.body;
                const contentDto = {title, description, poster, devstack, link, publicationDate: new Date(), likes: 0, dislikes: 0};
                content = await contentService.createContent(contentDto, 'project');
            }
            res.json(content);
        } catch (error) {
            return next(error);
        }
    }

    async getArticles(req, res, next) {
        try {
            const articles = await contentService.getArticles();
            res.json(articles);
        } catch (error) {
            return next(error);
        }
    }

    async getProjects(req, res, next) {
        try {
            const projects = await contentService.getProjects();
            res.json(projects);
        } catch (error) {
            return next(error);
        }
    }

    async getArticleById(req, res, next) {
        try {
            const article = await contentService.getArticleById(req.params.id);
            res.json(article);
        } catch (error) {
            return next(error);
        }
    }

    async getProjectById(req, res, next) {
        try {
            const project = await contentService.getProjectById(req.params.id);
            res.json(project);
        } catch (error) {
            return next(error);
        }
    }

    async addLike(req, res, next) {
        try {
            const content = await contentService.addLike(req.params.id, req.contentType);
            res.json(content);
        } catch (error) {
            return next(error);
        }
    }

    async addDislike(req, res, next) {
        try {
            const content = await contentService.addDislike(req.params.id, req.contentType);
            res.json(content);
        } catch (error) {
            return next(error);
        }
    }

    async updateContent(req, res, next) {
        try {
            let content;
            if (req.contentType === 'article') {
                const {title, text, poster} = req.body;
                const contentDto = {title, text, poster, publicationDate: new Date(), likes: 0, dislikes: 0};
                content = await contentService.createContent(contentDto, 'article');
            } else if (req.contentType === 'project') {
                const {title, description, poster, devstack, link} = req.body;
                const contentDto = {title, description, poster, devstack, link, publicationDate: new Date(), likes: 0, dislikes: 0};
                content = await contentService.createContent(contentDto, 'project');
            }

            res.json(content);
        } catch (error) {
            return next(error);
        }
    }

    async deleteContent(req, res, next) {
        const content = await contentService.deleteContent(req.params.id, req.contentType);
        res.json(content);
    }
}

module.exports = new ContentController();