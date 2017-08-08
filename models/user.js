const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String,
    userName: String
},{
    timestamps: true
});

// before saving the model, run this function first
userSchema.pre('save',function(next){
    // user is a instance of the model
    const user = this;
    // generate salt
    bcrypt.genSalt(10, function (err, salt) {
        if(err) {return next(err);}
        // hash password with the salt
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) {return next(err);}

            user.password = hash;
            next();
        });
    })
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch){
      if(err){return callback(err);}

      callback(null, isMatch);
  });
};

const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;

