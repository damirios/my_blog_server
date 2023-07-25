const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    poster: {type: String, required: true},
    publicationDate: {type: String, required: true},
    likes: {type: number, required: true},
    dislikes: {type: number, required: true}
});

module.exports = model("Article", ArticleSchema);