const express = require('express');
const router = express.Router();
const { account, coinInfo } = require("./controller")

router.get("/account", account)
router.post("/coin", coinInfo)

module.exports = router