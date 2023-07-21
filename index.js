const  path = require('path');


const express = require('express');
const app = express();
const port = 3000; // Change this to any port you prefer

const candleRouter = require('./candleRouter');

// Define a route for the root URL
app.get('/', (req, res) => {
  res.render('candleView.ejs')
})

app.use('/candle', candleRouter);
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});