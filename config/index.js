const dotenv = require("dotenv")

dotenv.config()

module.exports = {
    binanceApiKey: process.env.BINANCE_API_KEY_MAIN,
    binanceSecretKey: process.env.BINANCE_SECRET_KEY_MAIN
}