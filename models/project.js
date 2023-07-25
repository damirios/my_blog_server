const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    devstack: [{type: String, required: true}],
    poster: {type: String, required: true},
    publicationDate: {type: String, required: true},
    likes: {type: number, required: true},
    dislikes: {type: number, required: true},
    link: {type: String}
});

module.exports = model("Project", ProjectSchema);