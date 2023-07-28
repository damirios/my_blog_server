const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    devstack: [{type: String, required: true}],
    poster: {type: String, required: true},
    publicationDate: {type: String, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    link: {type: String},
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

module.exports = model("Project", ProjectSchema);