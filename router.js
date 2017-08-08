const authentication = require('./controlers/authentication');
const passport = require('passport');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){
    app.get('/',requireAuth, function(req,res){
        res.send({message: 'Hello World'});
    });

    app.post('/login', requireLogin, authentication.logIn);
    app.post('/signup', authentication.signUp);

};