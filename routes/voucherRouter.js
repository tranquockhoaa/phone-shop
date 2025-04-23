const controllerVoucher = require('./../controllers/voucherController');
const express = require('express');
router = express.Router();

router.post('/', controllerVoucher.createVoucher);

module.exports = router;
