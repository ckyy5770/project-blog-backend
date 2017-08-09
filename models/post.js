const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    tags: [String],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
}, {
    timestamps: true
});

const modelClass = mongoose.model('post', postSchema);

module.exports = modelClass;

