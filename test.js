const JSDOM = require("jsdom").JSDOM;
const fetch = require('node-fetch');

const test = async () => {

    const baseURL = `https://www.myfxbook.com/forex-market/currencies/USDJPY-historical-data`
    const response = await fetch(baseURL);
    const data = await response.text();
    const dom = new JSDOM(data);
    const window = dom.window;
    const document = window.document;
    const items = document.getElementsByName('openUSDJPY')
    const item = items[1]
    const inner = item.innerHTML
    console.log(items)
    console.log(item)
    console.log(inner)
    

    return 'hello';
}

module.exports = { test }