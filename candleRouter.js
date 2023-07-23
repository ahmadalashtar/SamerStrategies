const express = require('express');
const router = express.Router();
const { getCandles } = require('./candle')

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
        candles = await getCandles(pairs);
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

    let displayedCandles = [];
    for (const candle of candles) {
        let o = Number(candle['o']);
        let c = Number(candle['c']);
        const l = Number(candle['l']);
        const h = Number(candle['h']);
        const pair = candle['s'];

        const u = (o > c ? o : c);
        const d = (c < o ? c : o);
        const upperShadow = h - u;
        const lowerShadow = d - l;
        const body = u - d;
        const upperShadowUI = upperShadow * 100 / (upperShadow + lowerShadow + body)
        const lowerShadowUI = lowerShadow * 100 / (upperShadow + lowerShadow + body)
        const bodyUI = 100 - lowerShadowUI - upperShadowUI;

        let state;
        if (body < upperShadow || body < lowerShadow) {
            state = 'ارتدايدة'
        } else {
            state = 'دسمة'
        }


        const displayCandle = {
            'pair': pair,
            'high': h,
            'low': l,
            'open': u,
            'close': d,
            'color': o > c ? 'red' : 'green',
            'state': state,
            'upperShadow': upperShadowUI,
            'lowerShadow': lowerShadowUI,
            'body':bodyUI

        }
            console.log(displayCandle)
        
        displayedCandles.push(displayCandle);
    }
    



    res.render('candleView.ejs',{candles: displayedCandles})

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