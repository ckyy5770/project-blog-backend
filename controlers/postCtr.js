const Post = require("../models/post");

exports.fetchPosts = function(req, res){
    res.send('here are posts you need.');
};

exports.createPost = function (req, res) {
    res.send('200 OK');
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