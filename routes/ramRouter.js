const express = require('express');
const ramController = require('./../controllers/ramController');

router = express.Router();

router.post('/', ramController.createRam);
router.get('/', ramController.getAllRam);
router.get('/:id', ramController.getRamById);
router.put('/:id', ramController.updateRam);

module.exports = router;
