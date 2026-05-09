const express = require('express');
const router = express.Router();
const { getAccount, placeMarketOrder } = require("./controller")

router.get("/account", getAccount)
router.get("/placeOrder", placeMarketOrder)

module.exports = router