const fetch = require('node-fetch');

const test = async () => {

    const baseURL = `https://www.myfxbook.com/forex-market/currencies/USDJPY-historical-data`
    const response = await fetch(baseURL);
    const data = await response.text();
    

    return 'hello';
}

module.exports = { test }