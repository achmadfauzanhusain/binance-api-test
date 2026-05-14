const { Spot } = require('@binance/connector')
const { minQty, amountToQuantity, symbolPrice } = require("../info/controller")
const { binanceApiKey, binanceSecretKey } = require('../../config')

module.exports = {
    placeMarketOrder: async(req, res) => {
        try {
            const { amount } = req.body

            const minNotValueCount = await minQty("BTCUSDT")
            const price = await symbolPrice("BTCUSDT")
            const quantity = await amountToQuantity(amount, price, minNotValueCount)

            const client = new Spot(binanceApiKey, binanceSecretKey)
            const response = await client.newOrder('BTCUSDT', 'BUY', 'MARKET', {
                quantity: quantity,
            })
            res.status(200).json({
                data: quantity
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
            const { amount, price } = req.body

            const minNotValueCount = await minQty("BTCUSDT")
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
    },
    placeOcooOrder: async(req, res) => {
        try {
            const { quantity, abovePrice, belowStopPrice, belowPrice } = req.body

            // takeprofit di price
            // order jual dipasang di stopLimitPrice
            // eksekusi di stopPrice

            const client = new Spot(binanceApiKey, binanceSecretKey)
            const response = await client.newOCOOrder("BTCUSDT", 'SELL', quantity, "LIMIT_MAKER", "STOP_LOSS_LIMIT", {
                abovePrice,
                belowStopPrice,
                belowPrice,
                belowTimeInForce: "GTC"
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