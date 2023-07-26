const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    articleId: {type: Schema.Types.ObjectId, ref: "Article"},
    projectId: {type: Schema.Types.ObjectId, ref: "Project"},
    text: {type: String, required: true},
    isModerated: {type: Boolean, required: true},
    creationDate: {type: String, required: true},
    publicationDate: {type: String},
});

module.exports = model("Comment", CommentSchema);