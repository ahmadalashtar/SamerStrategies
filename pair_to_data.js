const fetch = require('node-fetch');
const {day} = require('./day')

const  {parse}  =require('node-html-parser');

const getCandle = async (pair) => {
    const counter = await day();
    console.log(counter)
    let o;
    let c;
    const high = [];
    const low=[];

    const baseURL = `https://www.myfxbook.com/forex-market/currencies/${pair}-historical-data`
    const response = await fetch(baseURL);
    const data = await response.text();
    const root = parse(data);
    const openItems = root.querySelectorAll(`span[name="open${pair}"]`)
    const highItems = root.querySelectorAll(`span[name="high${pair}"]`)
    const lowItems = root.querySelectorAll(`span[name="low${pair}"]`)
    const closeItems = root.querySelectorAll(`span[name="close${pair}"]`)
    o = parseFloat(openItems[counter-1].innerHTML)
    c = parseFloat(closeItems[0].innerHTML)
    for (let i = 0; i < counter ; i++){
        high.push(highItems[i].innerHTML)
        low.push(lowItems[i].innerHTML)
    }
    const h = parseFloat(Math.max(...high))
    const l = parseFloat(Math.min(...low))

    const u = (o >= c ? o : c);
    const d = (c <= o ? c : o);
    const upperShadow = h - u;
    const lowerShadow = d - l;
    const body = u - d;
    const upperShadowUI = upperShadow * 100 / (upperShadow + lowerShadow + body)
    const lowerShadowUI = lowerShadow * 100 / (upperShadow + lowerShadow + body)
    const bodyUI = body*100/(upperShadow + lowerShadow + body);
    let state;
    if (body < upperShadow || body < lowerShadow) {
        state = 'ارتدايدة'
    } else {
        state = 'دسمة'
    }
    // console.log({state: state, pair: pair, body: body, upperShadow: upperShadow, lowerShadow: lowerShadow,tf: body<body < upperShadow || body < lowerShadow})

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
    return displayCandle;
}

module.exports = { getCandle }