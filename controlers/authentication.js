const User = require('../models/user');

exports.signUp = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

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

                res.json({success: true});
            });
        }
    });
    
};