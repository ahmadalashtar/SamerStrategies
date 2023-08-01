const fetch = require('node-fetch');
const  {parse}  =require('node-html-parser');
const test = async () => {

    const baseURL = `https://www.myfxbook.com/forex-market/currencies/USDJPY-historical-data`
    const response = await fetch(baseURL);
    const data = await response.text();
    const root = parse(data);
    const items = root.querySelectorAll('span[name="timeUSDJPY"]')
    return items[0].innerHTML;
}

module.exports = { test }