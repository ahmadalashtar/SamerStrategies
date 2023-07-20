const fetch = require('node-fetch');
const { get } = require('./candleRouter');
const JSDOM = require("jsdom").JSDOM;

const getCandle = async (pair) => {
    const url = `https://finance.yahoo.com/quote/${pair}%3DX/history?period1=1658296191&period2=1689832191&interval=1wk&filter=history&frequency=1wk&includeAdjustedClose=true`
    const response = await fetch(url);
    const data = await response.text();
    const dom = new JSDOM(data);
    const window = dom.window
    const document = window.document
    const tbodies = document.getElementsByTagName('tbody')
    const tbody = tbodies[0]
    const elements = tbody.firstChild
    const children = elements.childNodes

    const childList = [children[1], children[2], children[3], children[4]]

    const spanList = [childList[0].firstChild, childList[1].firstChild,
    childList[2].firstChild, childList[3].firstChild]
    const valueList = [Number(spanList[0].innerHTML), Number(spanList[1].innerHTML),
        Number(spanList[2].innerHTML), Number(spanList[3].innerHTML)]
    // let item = document.getElementById('quote-header-info')
    // console.log(item.childNodes.length)
    // const items = document.getElementsByTagName('fin-streamer') 
    // console.log(items.length)
    // const item = items[19]
    // const element = item.firstChild
    // const color = window.getComputedStyle(element, null).getPropertyValue('color');  
    // console.log([valueList, color])
    O = valueList[0];
    H = valueList[1]
    L = valueList[2]
    C = valueList[3];

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
        'pair': pair,
        'O': O,
        'H': H,
        'L': L,
        'C': C,
        // 'color': color,
        'U': U,
        'D': D,
        'upperShade': Number(upperShade.toFixed(3)),
        'lowerShade': Number(lowerShade.toFixed(3)),
        'body': Number(body.toFixed(3)),
        'state': state,

    }
    console.log({'candle': candle})
    return candle;
}
module.exports = { getCandle }

