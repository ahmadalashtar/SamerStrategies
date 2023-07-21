const axios = require('axios');
require('dotenv').config()

const convertPirsToString = (pairs)=>{

    let pairsString = ""
    for (const pair of pairs) {
        let _pair = pair[0]+pair[1]+pair[2]+'/'+pair[3]+pair[4]+pair[5]+','
        pairsString += _pair
        
    }
    return pairsString
}

const getCandle = async (pairs) => {


    const pairsString = convertPirsToString(pairs)
    const url = `https://fcsapi.com/api-v3/forex/candle?symbol=${pairsString}&period=1w&access_key=${process.env.access_key}&candle=active`

    try {
        const response = await axios.get(url);
        return response.data

      } catch (error) {
        return { 'Error': error.messag };
    }
    
    
}

module.exports = { getCandle }