const express = require("express");
const router  = express.Router();
const postControler = require('../controlers/postCtr');
const passport = require('passport');
require('../services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});

// posts routes
router.get('/', postControler.fetchPosts);
router.post('/', postControler.createPost);
router.get('/:id', postControler.fetchById);
router.put('/:id', postControler.updateById);
router.delete('/:id', postControler.destroyById);

module.exports = router;