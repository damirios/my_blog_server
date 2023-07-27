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
}

module.exports = new ContentController();