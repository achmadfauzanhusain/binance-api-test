const { Spot } = require('@binance/connector')
const { binanceApiKey, binanceSecretKey } = require('../../config')

module.exports = {
    account: async(req, res) => {
        try {
            const client = new Spot(binanceApiKey, binanceSecretKey)
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
    symbolPrice: async(symbol) => {
        const client = new Spot(binanceApiKey, binanceSecretKey)
        const response = await client.tickerPrice(symbol)
        return parseFloat(response.data.price)  // return angkanya langsung
    },
    minQty: async(symbol) => {
        const client = new Spot(binanceApiKey, binanceSecretKey)
        const coinInfo = await client.exchangeInfo({ symbol: symbol })
        
        const lotSize = coinInfo.data.symbols[0].filters.find(f => f.filterType === 'LOT_SIZE')
        const stepSize = parseFloat(lotSize.stepSize).toString()
        const decimals = stepSize.includes('.') ? stepSize.split(".")[1].length : 0

        console.log('stepSize:', lotSize.stepSize, '→ decimals:', decimals)
        return decimals
    },
    amountToQuantity: async(amount, price, minNotValueCount) => {
        const raw = (1 / price) * amount
        const factor = Math.pow(10, minNotValueCount)
        const quantity = Math.floor(raw * factor) / factor  // bulatkan ke bawah sesuai stepSize
        
        console.log({ raw, quantity, minNotValueCount })
        return quantity.toFixed(minNotValueCount)
    }
}