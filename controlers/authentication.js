const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function getJwt(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timeStamp}, config.secret);
}

exports.logIn = function(req, res, next){
    res.send({
        user: {
            token: getJwt(req.user),
            nickName: req.user.nickName,
            id: req.user._id
        }
    });
};

exports.signUp = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const nickName = req.body.nickName;

    if(!email || !password || !nickName){
        return res.status(422).send({
            error: 'You must provide email, password and nickName.'
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
                password: password,
                nickName: nickName
            });

            user.save(function(err, newUser){
                if(err){return next(err);}

                res.send({
                    user: {
                        token: getJwt(newUser),
                        nickName: newUser.nickName,
                        id: newUser._id
                    }
                });
            });
        }
    });
    
};