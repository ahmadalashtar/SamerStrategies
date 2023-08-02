const express = require('express');
const app = express();
const { getCandle } = require('./pair_to_data')
const  path = require('path');
const port = 3000; // Choose any port you prefer

// Define a basic route
app.get('/', async (req, res) => {
    // const pairs = ["USDJPY"]

  const pairs = ["CHFJPY", "USDJPY", "EURJPY", "GBPJPY",
  "CADJPY", "AUDJPY", "NZDJPY", "USDCAD", "EURCAD", "GBPCAD",
      "AUDCAD", "NZDCAD", "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD",
      "EURAUD", "EURNZD", "GBPAUD", "GBPNZD", "EURGBP", "AUDNZD",
      "USDCHF", "EURCHF", "GBPCHF", "CADCHF", "AUDCHF", "NZDCHF"]
  const results = [];
  for (const pair of pairs){
    const result = await getCandle(pair);
    results.push(result);
  }
  res.render('candleView.ejs',{candles: results})


});
app.use(express.static(path.join(__dirname, 'public')));
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
