const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

const modelClass = mongoose.model('post', postSchema);

module.exports = modelClass;

