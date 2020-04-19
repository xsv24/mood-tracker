const { Authenticate } = require('../services/passport');

const SignIn = require('./auth');
const Entry = require('./entry');
const Config = require('./config');

module.exports = function(app) {
    app.get('/api/ping', (req, res) => res.send('hello'));
    app.use('/api/config', Config);
    
    // SignIn Authenticate
    app.use('/api', SignIn);
    
    // Authenticated routes
    app.use('/api', Authenticate);
    app.use('/api/entry', Entry);
};