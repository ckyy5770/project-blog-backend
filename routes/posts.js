const express = require("express");
const router  = express.Router();
const postControler = require('../controlers/postCtr');
const passport = require('passport');
require('../services/passport');

const jwtAuth = passport.authenticate('jwt', {session: false});

// posts routes
router.get('/', postControler.fetchPosts);
router.get('/:id', postControler.fetchById);
router.post('/', jwtAuth, postControler.createPost);
router.put('/:id', jwtAuth, postControler.checkOwnership, postControler.updateById);
router.delete('/:id', jwtAuth, postControler.checkOwnership, postControler.destroyById);

module.exports = router;