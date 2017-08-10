const express = require("express");
const router  = express.Router();
const authentication = require('../controlers/authentication');
const passport = require('passport');
require('../services/passport');

const localAuth = passport.authenticate('local', {session: false});

router.post('/login', localAuth, authentication.logIn);
router.post('/signup', authentication.signUp);

module.exports = router;

