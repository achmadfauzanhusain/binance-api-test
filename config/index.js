const dotenv = require("dotenv")

dotenv.config()

module.exports = {
    binanceApiKey: process.env.BINANCE_API_KEY_TEST,
    binanceSecretKey: process.env.BINANCE_SECRET_KEY_TEST
}