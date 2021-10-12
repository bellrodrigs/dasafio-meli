const router = require('express').Router();
const itemsControllers = require('../controllers/items')

router.get('/:id', itemsControllers.getItemById);

module.exports = router;