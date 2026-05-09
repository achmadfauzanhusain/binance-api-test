const express = require('express');
const router = express.Router();
const { getAccount, order } = require("./controller")

router.get("/account", getAccount)
router.get("/order", order)

module.exports = router