const passport = require('passport');
const PassportLocal = require('passport-local');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const localLogin = new PassportLocal({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
        if(err) {
            return done(err);
        }

        if(!user) { 
            return done(null, false, { error: 'User email not found' });
        }

        user.comparePassword(password, (err, same) => {        
            if(err) {
                return done(err);
            }   
            
            same ? done(null, user) : done(null, false, { error: 'Password invalid' });
        });
    });
});

const opts = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
};

const login = new Strategy(opts, function(payload, done) {
    User.findById(payload.sub, function(err, user) {
        if(err) {
            return done(err, false);
        }
        
        done(null, user || false);
    });
});

passport.use(login);
passport.use(localLogin);


exports.Authenticate =  function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        
        if (!user) { 
            
            // passport-jwt doesn't handle errors correctly
            if(info.message === 'No auth token' || info.message === 'Missing credentials') {
                info = { error: info.message };
            }
            return res.status(401).send(info); 
        }
        
        req.user = user;
        next();
    })(req, res, next);
};

exports.AuthSignIn = function (req, res, next) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
        if (err) { return next(err); }
        
        if (!user) { 
            if(info.message === 'No auth token' || info.message === 'Missing credentials') {
                info = { error: info.message };
            }
            return res.status(422).send(info); 
        }
        
        req.user = user;
        next();
    })(req, res, next);
};