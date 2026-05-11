const { Spot } = require('@binance/connector')
const { binanceApiKey, binanceSecretKey } = require('../../config')

module.exports = {
    account: async(req, res) => {
        try {
            const client = new Spot(binanceApiKey, binanceSecretKey, {
                // baseURL: 'https://testnet.binance.vision'
            })
            client.account().then(response => {
                res.status(200).json({ data: response.data })
            })
            
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message  // tampilkan error dari Binance
            });
        }
    },
    coinInfo: async(req, res) => {
        try {
            const { coin } = req.body

            console.log(coin)
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message  // tampilkan error dari Binance
            });
        }
    }
}