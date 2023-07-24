const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    author: {type: Schema.Types.ObjectId, required: true},
    text: {type: String, required: true},
    isModerated: {type: Boolean, required: true},
    creationDate: {type: String, required: true},
    publicationDate: {type: String, required: true},
});

module.exports = model("Comment", CommentSchema);