const Post = require("../models/post");


// middleware
exports.checkOwnership = function(req, res, next){
    const id = req.params.id;

    if(req.user === null) return res.status(401).send("You must login.");
    Post.findById(id, function (err, post) {
        if(err) return res.status(404).send("post not found");
        if(post === null) return res.status(404).send("post not found");
        if(req.user._id.toString() !== post.author.id.toString()) return res.status(401).send("You are not the author of this post.");

        next();
    });
};

// post related opts
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
    const tags = req.body.tags;

    if(!title || !content){
        return res.status(422).send('You must provide both title and content.');
    }

    console.log(req.user);
    const post = new Post({
        title: title,
        content: content,
        author: {
            id: req.user._id,
            nickName: req.user.nickName
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


};

exports.fetchById = function (req, res, next) {
    const id = req.params.id;
    Post.findById(id, function (err, post) {
        if(err){
            return next(err);
        }else{
            if(post === null) return res.status(404).send("post not found");

            // increment views
            post.views = post.views + 1;
            post.save(function (err, updatedPost) {
                if(err) return next(err);
            });
            return res.status(200).send(post);
        }
    });
};

exports.updateById = function (req, res, next) {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const tags = req.body.tags;

    const updateFields = {
        title: title,
        content: content,
        tags: tags
    };


    Post.findByIdAndUpdate(id, updateFields, {new: true},  function (err, updatedPost) {
        if(err){
            return next(err);
        }else{
            if(updatedPost === null) return res.status(404).send("post not found");

            return res.status(200).send(updatedPost);
        }
    });
};

exports.destroyById = function (req, res, next) {
    const id = req.params.id;
    Post.findByIdAndRemove(id, function (err, post) {
        if(err){
            return next(err);
        }else{
            if(post === null) return res.status(404).send("post not found");

            return res.status(200).send(post);
        }
    });
};