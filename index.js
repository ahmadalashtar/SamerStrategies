


const express = require('express');
const app = express();
const port = 3000; // Change this to any port you prefer

const candleRouter = require('./candleRouter');

// Define a route for the root URL


app.use('/candle', candleRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});