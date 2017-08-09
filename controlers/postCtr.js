const Post = require("../models/post");
const User = require("../models/user");

exports.fetchPosts = function(req, res, next){
    Post.find({}, function(err, posts){
        if(err){
            return next(err);
        } else {
            return res.status(200).send(posts);
        }
    });
};

exports.createPost = function (req, res, next) {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const tags = req.body.tags;

    if(!title || !content || !author){
        return res.status(422).send({
            error: 'You must provide title, content and author.'
        })
    }

    User.findOne({email: author}, function (err, existingUser) {
        if(err) {
            return next(err);
        }else{
            if(existingUser === null){
                return res.status(422).send({
                    error: "Author not found."
                })
            }
            const post = new Post({
                title: title,
                content: content,
                author: {
                    id: existingUser._id,
                    username: existingUser.username
                },
                tags: tags
            });

            post.save(function (err, newPost) {
                if(err){
                    return next(err);
                }else{
                    return res.status(200).send(newPost);
                }
            })
        }
    });

};

exports.fetchById = function (req, res, next) {
    const id = req.params.id;
    Post.findById(id, function (err, post) {
        if(err){
            return next(err);
        }else{
            if(post === null) return res.status(422).send("post not found");
            return res.status(200).send(post);
        }
    });
};

exports.updateById = function (req, res, next) {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const tags = req.body.tags;

    const post = {
        title: title,
        content: content,
        tags: tags
    };


    Post.findByIdAndUpdate(id, post, {new: true}, function (err, updatedPost) {
        if(err){
            return next(err);
        }else{
            if(updatedPost === null) return res.status(422).send("post not found");
            return res.status(200).send(updatedPost);
        }
    });
};

exports.destroyById = function (req, res) {
    const id = req.params.id;
    Post.findByIdAndRemove(id, function (err, updatedPost) {
        if(err){
            return next(err);
        }else{
            if(updatedPost === null) return res.status(422).send("post not found");
            return res.status(200).send("delete succeed.");
        }
    });
};