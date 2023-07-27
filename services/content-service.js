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
}

module.exports = new ContentService();