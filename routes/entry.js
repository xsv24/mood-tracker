const { Router } = require('express');
const Entries = require('../controllers/entry');

const router = Router();

router.get('/', Entries.Entries);
router.post('/', Entries.createEntry);
router.patch('/:id', Entries.updateEntry);

module.exports = router;