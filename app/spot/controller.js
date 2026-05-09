const { Spot } = require('@binance/connector')
const { binanceApiKey, binanceSecretKey } = require('../../config')

module.exports = {
    getAccount: async(req, res) => {
        try {
            const client = new Spot(binanceApiKey, binanceSecretKey, {
                // baseURL: 'https://testnet.binance.vision'
            })
            client.account().then(response => {
                client.logger.log(response.data)
                res.status(200).json({ data: response.data })
            })
            
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!" })
        }
    },
    placeMarketOrder: async(req, res) => {
        try {
            const client = new Spot(binanceApiKey, binanceSecretKey)
            const response = await client.newOrder('BTCUSDT', 'BUY', 'MARKET', {
                quantity: 1,
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
    }
}