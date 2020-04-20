const jwt = require('jwt-simple');
const User = require('../models/user');

function createToken(user) {
    return jwt.encode(
        { sub: user.id, iat: new Date().getTime() }, 
        process.env.SECRET
    );
}

exports.signUp = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({ error: 'Must provide Email & Password' });
    }

    User.findOne({ email: email }, function(err, user) {
        if(err) {
            return next(err);
        }

        if(user) {
            return res.status(422).send({ error: 'Email is already registered' });
        }

        const createdUser = new User({
            email,
            password
        });

        createdUser.save((err) => {
            if(err) {
                return next(err);
            }
            
            res.json({
                user: { email: user.email }, 
                token: createToken(createdUser) 
            });
        });

    });
};

exports.signIn = function(req, res) {
    res.send({
        user: { email: req.user.email }, 
        token: createToken(req.user) 
    });
};