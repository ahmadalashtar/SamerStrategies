const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
// const pairs = ["CHFJPY", "USDJPY"]
const symbols = ['JPY','CHF', 'USD','EUR', 'GBP','CAD','AUD','NZD']
const pairs = ["CHFJPY", "USDJPY", "EURJPY", "GBPJPY"]
// "CADJPY", "AUDJPY", "NZDJPY", "USDCAD", "EURCAD", "GBPCAD",
//     "AUDCAD", "NZDCAD", "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD",
//     "EURAUD", "EURNZD", "GBPAUD", "GBPNZD", "EURGBP", "AUDNZD",
//     "USDCHF", "EURCHF", "GBPCHF", "CADCHF", "AUDCHF", "NZDCHF"]

// Define the "candle" route
router.get('/', async (req, res) => {
    let results = [];
    res.setHeader('Content-Type', 'text/html');
    for(let pair of pairs){
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setViewport({ width: 1280, height: 800 })
        let elements;
        let element;
        let found;
        let text;
        await page.goto(`https://www.tradingview.com/chart/?symbol=FX%3A${pair}`);

        elements = await page.$$('.valueValue-l31H9iuA')
        found = false;
        while (!found) {
            if (elements.length > 0) {
                found = true;
            }
            elements = await page.$$('.valueValue-l31H9iuA')
        }
        element = elements[1]

        const initialO = await(await element.getProperty('textContent')).jsonValue();


        elements = await page.$$('.text-GwQQdU8S')

        found = false;

        while (!found) {
            if (elements.length > 0) {
                found = true;
            }
            elements = await page.$$('.text-GwQQdU8S');
            element = elements[19]
        }

        await element.click();


        elements = []
        found = false;
        while (!found) {
            text = await(await element.getProperty('textContent')).jsonValue()
            if (elements.length > 0 && text != initialO) {
                found = true;
            }
            elements = await page.$$('.valueValue-l31H9iuA')
            element = elements[1]
        }

        O = Number(text);
        element = elements[2]
        text = await(await element.getProperty('textContent')).jsonValue()
        H = Number(text);
        element = elements[3]
        text = await(await element.getProperty('textContent')).jsonValue()
        L = Number(text);
        element = elements[4]
        text = await(await element.getProperty('textContent')).jsonValue()
        C = Number(text);

        const color = await page.evaluate(() => {
        
            const items = document.getElementsByClassName('valueValue-l31H9iuA')
            const item = items[1]
            return item.style.color
        });

        const U = (O >= C ? O : C);
        const D = (C <= O ? C : O);
        const upperShade = H - U;
        const lowerShade = D - L;
        const body = U - D;
        let state;
        if (body < lowerShade || body < lowerShade) {
            state = 'thin'
        } else {
            state = 'fat'
        }

        const candle = {
            'O': O,
            'H': H,
            'L': L,
            'C': C,
            'color': color,
            'U': U,
            'D': D,
            'upperShade': upperShade,
            'lowerShade': lowerShade,
            'body': body,
            'state': state,

        }
        await browser.close()
        const arabicState = state == 'thin' ? 'ارتدادية' : 'دسمة'
        pair = pair[0] + pair[1] + pair[2] + " " + pair[3] + pair[4] + pair[5]
        
        const result = {
            'pair': pair,
            'state': arabicState,
            'color':color
        }
        results.push(result)
        console.log({ 'result': result })
        console.log({ 'results': results })
    }
    const split_pairs = pairs.map((pair) => {
        pair = pair[0] + pair[1] + pair[2] + " " + pair[3] + pair[4] + pair[5]
        return pair;
    })
    const sixFatsOneThin = [];
    symbols.forEach((symbol) => {
        let fatCount = 0;
        results.forEach(obj => {
            
            const split_pair_array = obj['pair'].split(' ');
            if (split_pair_array.includes(symbol)) {
                if (obj['state'] == 'دسمة') {
                    fatCount+=1
                }
            }
        })
        console.log({'fatCount': fatCount})
        if (fatCount >= 6 || fatCount == 4) {
            sixFatsOneThin.push({
                'symbol': symbol,
                'count': fatCount

            })
        }
    })
    console.log({'sixFatsOneThin': sixFatsOneThin})
    res.render('candleView.ejs', {
        results: results,
        sixFatsOneThin:sixFatsOneThin})
    res.end();
});

module.exports = router;
