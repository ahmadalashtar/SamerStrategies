const express = require('express');
const router = express.Router();
const { getCandle } = require('./candle')

// const pairs = ["CHFJPY"]
const symbols = ['JPY','CHF', 'USD','EUR', 'GBP','CAD','AUD','NZD']
const pairs = ["CHFJPY", "USDJPY", "EURJPY", "GBPJPY",
"CADJPY", "AUDJPY", "NZDJPY", "USDCAD", "EURCAD", "GBPCAD",
    "AUDCAD", "NZDCAD", "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD",
    "EURAUD", "EURNZD", "GBPAUD", "GBPNZD", "EURGBP", "AUDNZD",
    "USDCHF", "EURCHF", "GBPCHF", "CADCHF", "AUDCHF", "NZDCHF"]
// Define the "candle" route

router.get('/', async (req, res) => {
    let candles;

    try {
        candles = await getCandle(pairs);
        // const result = {
        //     'pair': candle['pair'],
        //     'state': candle['state'] == 'thin' ? 'ارتدادية' : 'دسمة',
        // }
        // results.push(result)
    } catch(error) {
        console.log(`Found an error: ${error}`)
        // console.log(`${pair} pushed`)
        // pairs.push(pair)
    }

    // let displayedCandles = [];
    



    // res.render('candleView.ejs',{candles: displayedCandles})
    res.send(candles)

    //     const arabicState = state == 'thin' ? 'ارتدادية' : 'دسمة'
    //     pair = pair[0] + pair[1] + pair[2] + " " + pair[3] + pair[4] + pair[5]
        

    //     results.push(result)
    //     console.log({ 'result': result })
    //     console.log({ 'results': results })
    
    // const split_pairs = pairs.map((pair) => {
    //     pair = pair[0] + pair[1] + pair[2] + " " + pair[3] + pair[4] + pair[5]
    //     return pair;
    // })
    // const sixFatsOneThin = [];
    // symbols.forEach((symbol) => {
    //     let fatCount = 0;
    //     results.forEach(obj => {
            
    //         const split_pair_array = obj['pair'].split(' ');
    //         if (split_pair_array.includes(symbol)) {
    //             if (obj['state'] == 'دسمة') {
    //                 fatCount+=1
    //             }
    //         }
    //     })
    //     console.log({'fatCount': fatCount})
    //     if (fatCount >= 6) {
    //         sixFatsOneThin.push({
    //             'symbol': symbol,
    //             'count': fatCount

    //         })
    //     }
    // })
    // console.log({'sixFatsOneThin': sixFatsOneThin})
    // res.render('candleView.ejs', {
    //     results: results,
    //     sixFatsOneThin:sixFatsOneThin})
    // res.end();
});

module.exports = router;