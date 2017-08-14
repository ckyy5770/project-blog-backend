const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    tags: {type: [String], default: []},
    pics: {type: [String], default: ["http://hd.wallpaperswide.com/thumbs/funny_lazy_cat-t2.jpg"]},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        nickName: String
    },
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    comments: {type: Number, default: 0}
}, {
    timestamps: true
});

const modelClass = mongoose.model('post', postSchema);

module.exports = modelClass;

