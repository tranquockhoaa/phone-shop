const brandController = require('../controllers/brandController');
const express = require('express');

router = express.Router();

router.get('/', brandController.getBrandByName);
router.get('/:id', brandController.getBrandByPk);
router.post('/', brandController.createBrand);
router.put('/:id', brandController.updateBrand);

module.exports = router;
