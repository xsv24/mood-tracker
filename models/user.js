const { model, Schema } = require('mongoose');
const { genSalt, hash, compare } = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

userSchema.pre('save', function(next) {
    const user = this;

    genSalt(10, function(err, salt) {
        if(err) return next(err);

        hash(user.password, salt, null, function(err, hash) {
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
});

userSchema.methods.comparePassword = function(password, callback) {
    compare(password, this.password, (err, same) => {
        if(err) {
            return callback(err);
        }
        return callback(null, same);
    })
};

module.exports = model('User', userSchema);