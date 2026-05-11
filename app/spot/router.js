const express = require('express');
const router = express.Router();
const { placeMarketOrder, placeLimitOrder } = require("./controller")

router.post("/placeOrder", placeMarketOrder)
router.post("/limitOrder", placeLimitOrder)

module.exports = router