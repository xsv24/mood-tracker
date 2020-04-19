const { Router } = require('express');
const Config = require('../controllers/config');

const router = Router();

router.get('/', Config.config);

module.exports = router;