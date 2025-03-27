const colorController = require('./../controllers/colorController');
const express = require('express');

const router = express.Router();

router.get('/', colorController.getAllColor);
router.get('/:id', colorController.getColorByPk);
router.post('/', colorController.createColor);
router.put('/:id', colorController.updateColor);

module.exports = router;
