const express = require('express');
const router = express.Router();
const { account, symbolPrice } = require("./controller")

router.get("/account", account)
router.post("/price", symbolPrice)

module.exports = router