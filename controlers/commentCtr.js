const Comment = require("../models/comment");
const Post = require("../models/post");

// middleware
exports.checkOwnership = function(req, res, next){
    const id = req.params.commentId;

    if(req.user === null) return res.status(401).send("You must login.");
    Comment.findById(id, function (err, comment) {
        if(err) return res.status(404).send("comment not found");
        if(comment === null) return res.status(404).send("comment not found");
        if(req.user._id.toString() !== comment.author.id.toString()) return res.status(401).send("You are not the author of this comment.");

        next();
    });
};

// comment related opts
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

    Post.findById(postId, function (err, post) {
        if(err) return next(err);
        if(post === null) return res.status(404).send("Post not found.");

        const comment = new Comment({
            content: content,
            postId: postId,
            author: {
                id: req.user._id,
                nickName: req.user.nickName
            }
        });
        comment.save(function (err, newComment) {
            if(err) return next(err);

            // increment comment number of the post
            post.comments = post.comments + 1;
            post.save(function (err, newPost) {
                if(err) return next(err);

                res.status(200).send(newComment);
            })
        })
    });
};

exports.fetchById = function (req, res, next) {
    const commentId = req.params.commentId;
    Comment.findById(commentId, function (err, comment) {
       if(err) return next(err);
       if(comment === null) return res.status(404).send("Comment not found.");

       return res.status(200).send(comment);
    });
};

exports.updateById = function (req, res, next) {
    const commentId = req.params.commentId;
    const content = req.body.content;
    const updateFields = {
        content: content
    };

    Comment.findByIdAndUpdate(commentId, updateFields, {new: true}, function (err, updatedComment) {
        if(err) return next(err);
        if(updatedComment === null) return res.status(404).send("Comment not found.");

        return res.status(200).send(updatedComment);
    });
};

exports.destroyById = function (req, res, next) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    Comment.findByIdAndRemove(commentId, function (err, comment) {
        if(err) return next(err);
        if(comment === null) return res.status(404).send("Comment not found.");

        // decrement comments number
        Post.findById(postId, function (err, post) {
            if(err) return next(err);
            post.comments = post.comments - 1;
            post.save(function (err, newPost) {
                if(err) return next(err);
                return res.status(200).send(comment);
            })
        });

    });
};