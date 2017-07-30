const authentication = require('./controlers/authentication');
const passport = require('passport');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
    app.get('/',requireAuth, function(req,res){
        res.send({test: 'test'});
    });

    app.post('/signin', requireSignin, authentication.signIn);
    app.post('/signup', authentication.signUp);

};