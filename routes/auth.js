const { Router } = require('express');
const Auth = require('../controllers/auth');
const { AuthSignIn, Authenticate } = require('../services/passport');

const router = Router();

router.post('/verify', Authenticate, Auth.signIn);
router.post('/signin', AuthSignIn, Auth.signIn);
router.post('/signup', Auth.signUp);

module.exports = router;