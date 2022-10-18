const express = require("express");
const createOrder = require("../controllers/order_details");

const router = express.Router();
router.post("/", createOrder);
module.exports = router;
