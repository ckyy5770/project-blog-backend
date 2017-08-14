const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        nickName: String
    }
}, {
    timestamps: true
});

const modelClass = mongoose.model('comment', commentSchema);

module.exports = modelClass;

