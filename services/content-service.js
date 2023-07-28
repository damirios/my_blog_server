const ProjectModel = require('../models/project');
const ArticleModel = require('../models/article');

class ContentService {
    constructor() {}

    async getProjects() {
        const projects = await ProjectModel.find({});
        return projects;
    }

    async getArticles() {
        const articles = await ArticleModel.find({});
        return articles;
    }

    async getProjectById(projectId) {
        const project = await ProjectModel.findById(projectId);
        return project;
    }

    async getArticleById(articleId) {
        const article = await ArticleModel.findById(articleId);
        return article;
    }

    async createContent(contentDto, type) {
        let content;
        if (type === 'article') {
            content = await ArticleModel.create({...contentDto});
        } else if (type === 'project') {
            content = await ProjectModel.create({...contentDto});
        }

        return content;
    }

    async addLike(id, type) {
        if (type === 'article') {
            const article = await ArticleModel.findById(id);
            article.likes++;
            await article.save();
            return article;
        } else if (type === 'project') {
            const project = await ProjectModel.findById(id);
            project.likes++;
            await project.save();
            return project;
        }
    }

    async addDislike(id, type) {
        if (type === 'article') {
            const article = await ArticleModel.findById(id);
            article.dislikes++;
            await article.save();
            return article;
        } else if (type === 'project') {
            const project = await ProjectModel.findById(id);
            project.dislikes++;
            await project.save();
            return project;
        }
    }

    async updateContent(contentId, contentDto, type) {
        let content;
        if (type === 'article') {
            content = await ArticleModel.findById(contentId);
            if (contentDto.title) {
                content.title = contentDto.title;
            }
            if (contentDto.text) {
                content.text = contentDto.text;
            }
            if (contentDto.poster) {
                content.poster = contentDto.poster;
            }
        } else if (type === 'project') {
            content = await ProjectModel.findById(contentId);
            if (contentDto.title) {
                content.title = contentDto.title;
            }
            if (contentDto.description) {
                content.description = contentDto.description;
            }
            if (contentDto.poster) {
                content.devstack = contentDto.devstack;
            }
            if (contentDto.poster) {
                content.poster = contentDto.poster;
            }
            if (contentDto.link) {
                content.link = contentDto.link;
            }
        }

        await content.save();
        return content;
    }
}

module.exports = new ContentService();