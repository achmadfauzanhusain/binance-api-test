const express = require('express');
const router = express.Router();
const { account, minQty } = require("./controller")

router.get("/account", account)

module.exports = router