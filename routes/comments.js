const express = require("express");
const router  = express.Router();
const commentControler = require('../controlers/commentCtr');
const passport = require('passport');
require('../services/passport');

const jwtAuth = passport.authenticate('jwt', {session: false});

// posts routes;
router.get('/:postId/comments', commentControler.fetchByPost);
router.get('/:postId/comments/:commentId', commentControler.fetchById);
router.post('/:postId/comments', jwtAuth, commentControler.createComment);
router.put('/:postId/comments/:commentId', jwtAuth, commentControler.checkOwnership, commentControler.updateById);
router.delete('/:postId/comments/:commentId', jwtAuth, commentControler.checkOwnership, commentControler.destroyById);

module.exports = router;