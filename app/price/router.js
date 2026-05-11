const express = require('express');
const router = express.Router();
const { btcUsdt } = require("./controller")

router.get("/btcUsdt", btcUsdt)

module.exports = router