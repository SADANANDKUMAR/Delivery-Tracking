const express = require("express");
const router = express.Router();

const deleteorderdetails = require("../controllers/delete_order_details");
router.delete("/:order_id", deleteorderdetails);

module.exports = router;
