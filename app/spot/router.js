const express = require('express');
const router = express.Router();
const { placeMarketOrder, placeLimitOrder, placeOcooOrder } = require("./controller")

router.post("/placeOrder", placeMarketOrder)
router.post("/limitOrder", placeLimitOrder)
router.post("/ocooOrder", placeOcooOrder)

module.exports = router