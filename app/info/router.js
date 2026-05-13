const express = require('express');
const router = express.Router();
const { account, symbolPrice } = require("./controller")

router.get("/account", account)
router.get("/price", symbolPrice)

module.exports = router