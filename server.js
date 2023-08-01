const express = require('express');
const app = express();
const { test } = require('./test')
const port = 3000; // Choose any port you prefer

// Define a basic route
app.get('/', async (req, res) => {
  res.send(adjustedDayNumber);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
