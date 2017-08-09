const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

exports.fetchByPost = function (req, res, next) {
    const postId = req.params.postId;
    Comment.find({postId: postId}, function (err, comments) {
        if(err) return next(err);
        return res.status(200).send(comments);
    })
};

exports.createComment = function (req, res, next) {
    const postId = req.params.postId;
    const content = req.body.content;
    //const author = req.user;

    Post.findById(postId, function (err, post) {
        if(err) return next(err);
        if(post === null) return res.status(422).send({
            err: "post not found"
        });
        const comment = new Comment({
            content: content,
            postId: postId
        });
        comment.save(function (err, newComment) {
            if(err) return next(err);
            res.status(200).send(newComment);
        })
    });
};

exports.fetchById = function (req, res) {
    const commentId = req.params.commentId;
    Comment.findById(commentId, function (err, comment) {
       if(err) return next(err);
       if(comment === null) return res.status(422).send({
           err: "comment not found"
       });
       return res.status(200).send(comment);
    });
};

exports.updateById = function (req, res) {
    const commentId = req.params.commentId;
    const content = req.body.content;
    const updateFields = {
        content: content
    };

    Comment.findByIdAndUpdate(commentId, updateFields, {new: true}, function (err, updatedComment) {
        if(err) return next(err);
        if(updatedComment === null) return res.status(422).send({
            err: "comment not found"
        });
        return res.status(200).send(updatedComment);
    });
};

exports.destroyById = function (req, res) {
    const commentId = req.params.commentId;
    Comment.findByIdAndRemove(commentId, function (err, comment) {
        if(err) return next(err);
        if(comment === null) return res.status(422).send({
            err: "comment not found"
        });
        return res.status(200).send(comment);
    });
};