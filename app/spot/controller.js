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
    order: async(req, res) => {
        try {
            const client = new Spot(binanceApiKey, binanceSecretKey)
            const data = client.newOrder('BTCUSDT', 'BUY', 'LIMIT', {
                price: '350',
                quantity: 1,
                timeInForce: 'GTC'
            }).then(response => client.logger.log(response.data))
            .catch(error => client.logger.error(error))
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}