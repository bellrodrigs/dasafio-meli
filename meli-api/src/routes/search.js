const router = require('express').Router();
const searchControllers = require('../controllers/search')

router.get('/:query&:page', searchControllers.searchItems);

module.exports = router;