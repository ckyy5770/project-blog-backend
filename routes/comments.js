const express = require("express");
const router  = express.Router();
const commentControler = require('../controlers/commentCtr');
const passport = require('passport');
require('../services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});

// posts routes;
router.get('/:postId/comments', commentControler.fetchByPost);
router.post('/:postId/comments', commentControler.createComment);
router.get('/:postId/comments/:commentId', commentControler.fetchById);
router.put('/:postId/comments/:commentId', commentControler.updateById);
router.delete('/:postId/comments/:commentId', commentControler.destroyById);

module.exports = router;