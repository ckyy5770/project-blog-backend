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

exports.fetchById = function (req, res) {
    const id = req.params.id;
    res.send('fetch post by id: ' + id);
};

exports.updateById = function (req, res) {
    const id = req.params.id;
    res.send('update post by id: ' + id);
};

exports.destroyById = function (req, res) {
    const id = req.params.id;
    res.send('delete post by id: ' + id);
};