const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
});

const modelClass = mongoose.model('comment', commentSchema);

module.exports = modelClass;

