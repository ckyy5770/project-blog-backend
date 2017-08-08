const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    content: String
}, {
    timestamps: true
});

const modelClass = mongoose.model('comment', commentSchema);

module.exports = modelClass;

