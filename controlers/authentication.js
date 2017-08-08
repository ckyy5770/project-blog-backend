const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function getJwt(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timeStamp}, config.secret);
}

exports.logIn = function(req, res, next){
    res.send({token: getJwt(req.user)});
};

exports.signUp = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({
            error: 'You must provide both email and password.'
        })
    }

    User.findOne({email: email}, function(err, existingUser){
        // handle db operation err
        if(err){
            return next(err);
        }
        // make sure the email of new user does not already exist
        if(existingUser){
            return res.status(422).send({
                error: 'This email is already signed up for another user.'
            });
        }else{
            const user = new User({
                email: email,
                password: password
            });

            user.save(function(err){
                if(err){return next(err);}

                res.json({token: getJwt(user)});
            });
        }
    });
    
};