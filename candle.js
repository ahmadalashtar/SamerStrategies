const axios = require('axios');
const {makeApiKey} = require('./makeApiKey')
require('dotenv').config()

const convertPirsToString = (pairs)=>{

    let pairsString = ""
    for (const pair of pairs) {
        let _pair = pair[0]+pair[1]+pair[2]+'/'+pair[3]+pair[4]+pair[5]+','
        pairsString += _pair
        
    }
    return pairsString
}

const getCandles = async (pairs) =>{
    let candles = []
    for (const pair of pairs) {
        const fromPair = pair[0] + pair[1] + pair[2]
        const toPair = pair[3]+pair[4]+pair[5]
        const apiKey = makeApiKey(16)
        const pairsString = convertPirsToString(pairs)
        const url =
            `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${fromPair}&to_symbol=${toPair}&apikey=${apiKey}`
        // const url = `https://fcsapi.com/api-v3/forex/candle?symbol=${pairsString}&period=1w&access_key=${process.env.access_key}&candle=active`

        const config = {
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.5",
                "Connection": "keep-alive",
                "DNT": "1",
                "Host": "www.alphavantage.co",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "TE": "trailers",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0"
            }
        }
        try {
            const response = await axios.get(url, config);
            const result = response.data['Time Series FX (Weekly)'][Object.keys(response.data['Time Series FX (Weekly)'])[0]]
            const candle = {
                'o': result['1. open'],
                'h': result['2. high'],
                'l': result['3. low'],
                'c': result['4. close'],
                's': pair
            }
            candles.push(candle)

        } catch (error) {
            console.log({ 'Error': error.messag });
            console.log("Challenge Accepted")
            pairs.push(pair)
        }
    }   
    return candles;
    
    
}
module.exports = { getCandles }