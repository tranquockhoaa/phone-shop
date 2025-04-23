const userController = require('../controllers/userController');
const express = require('express');
router = express.Router();

router.get('/:email', userController.getInforByEmail);

module.exports = router;
