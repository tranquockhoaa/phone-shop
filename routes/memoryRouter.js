const memoryController = require('../controllers/memoryController');
const express = require('express');

const router = express.Router();

router.post('/', memoryController.createMemory);

module.exports = router;
