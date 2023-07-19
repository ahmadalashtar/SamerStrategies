
const puppeteer = require('puppeteer');

const pairs = ["CHFJPY", "USDJPY", "EURJPY", "GBPJPY", "CADJPY", "AUDJPY", "NZDJPY", "USDCAD", "EURCAD", "GBPCAD", "AUDCAD", "NZDCAD", "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD", "EURAUD", "EURNZD", "GBPAUD", "GBPNZD", "EURGBP", "AUDNZD", "USDCHF", "EURCHF", "GBPCHF", "CADCHF", "AUDCHF", "NZDCHF"]
// const pairs = ["CHFJPY", "USDJPY", "EURJPY", "GBPJPY", "CADJPY", "AUDJPY", "NZDJPY"]
let results = [];
for (let i = 0; i < pairs.length; i++) {
    (async () => {
    
        const pair = pairs[i]
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

        const initialO = await (await element.getProperty('textContent')).jsonValue();


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
            text = await (await element.getProperty('textContent')).jsonValue()
            if (elements.length > 0 && text != initialO) {
                found = true;
            }
            elements = await page.$$('.valueValue-l31H9iuA')
            element = elements[1]
        }

        O = Number(text);
        element = elements[2]
        text = await (await element.getProperty('textContent')).jsonValue()
        H = Number(text);
        element = elements[3]
        text = await (await element.getProperty('textContent')).jsonValue()
        L = Number(text);
        element = elements[4]
        text = await (await element.getProperty('textContent')).jsonValue()
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
        const arabicState = state == 'thin' ? 'ارتدادية' : 'دسمة'
        const result = {
            'pair': pair,
            'state': arabicState,
            'color': color
        }
        results.push(result)
        console.log({ 'result': result })
        console.log({ 'results': results })
        await browser.close()

    })()
}