const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true},
    },
    login: {type: String, requied: true, maxLength: 32, minLength: 4},
    password: {type: String, requied: true, maxLength: 32, minLength: 4},
    registrationDate: {type: string, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    isBanned: {type: Boolean, required: true},
    banReason: {type: String, maxLength: 64},
    unbaningDate: {type: String}
});

module.exports = model("User", UserSchema);