const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    tag: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
}, {
    timestamps: true
});

const modelClass = mongoose.model('post', postSchema);

module.exports = modelClass;

