const express = require('express');
const router = express.Router();
const { getAccount, placeMarketOrder, placeLimitOrder } = require("./controller")

router.get("/account", getAccount)
router.post("/placeOrder", placeMarketOrder)
router.post("/limitOrder", placeLimitOrder)

module.exports = router