const { Spot } = require('@binance/connector')
const { minQty, amountToQuantity } = require("../info/controller")
const { binanceApiKey, binanceSecretKey } = require('../../config')

module.exports = {
    placeMarketOrder: async(req, res) => {
        try {
            const { quantity } = req.body

            const client = new Spot(binanceApiKey, binanceSecretKey)
            const response = await client.newOrder('BTCUSDT', 'BUY', 'MARKET', {
                quantity: quantity,
            })
            res.status(200).json({
                data: response
            })
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message  // tampilkan error dari Binance
            });
        }
    },
    placeLimitOrder: async(req, res) => {
        try {
            const { symbol, amount, price } = req.body

            const minNotValueCount = await minQty(symbol)
            const quantity = await amountToQuantity(amount, price, minNotValueCount)

            const client = new Spot(binanceApiKey, binanceSecretKey)
            const response = await client.newOrder('BTCUSDT', 'SELL', 'LIMIT', {
                price: price,
                quantity: quantity,
                timeInForce: 'GTC'
            })
            res.status(200).json({
                data: response.data
            })
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message
            });
        }
    }
}