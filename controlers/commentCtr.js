const Comment = require("../models/comment");

exports.createComment = function (req, res) {
    const postId = req.params.postId;
    res.send('200 OK, postId: ' + postId);
};

exports.fetchById = function (req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    res.send('fetch post by postId: ' + postId + 'commentId: ' + commentId);
};

exports.updateById = function (req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    res.send('update post by postId: ' + postId + 'commentId: ' + commentId);
};

exports.destroyById = function (req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    res.send('destroy post by postId: ' + postId + 'commentId: ' + commentId);
};