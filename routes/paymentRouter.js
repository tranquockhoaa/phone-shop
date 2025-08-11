const express = require("express");
const paymentController = require("../controllers/paymentController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/", authController.protect, paymentController.createPayment);

module.exports = router;
