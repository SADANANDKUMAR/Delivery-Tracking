const express = require("express");
const router = express.Router();

const getorderdetails = require("../controllers/get_order_details");
router.get("/:order_id", getorderdetails);

module.exports = router;
