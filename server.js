const express = require('express');
const app = express();

//routes

app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
  app.listen(3000)