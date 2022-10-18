const express = require("express");
const updateLocations = require("../controllers/locations");

const router = express.Router();
router.post("/:order_id", updateLocations);

module.exports = router;
