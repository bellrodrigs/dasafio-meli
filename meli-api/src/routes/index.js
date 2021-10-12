const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Desafio Meli',
        version: '1.0.0'
    });
});


module.exports = router;