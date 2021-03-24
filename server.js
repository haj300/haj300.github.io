const express = require("express");
const axios = require('axios');

const request = require('request');
const ejs = require('ejs');

const app = express();
require('dotenv/config');


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
// app.use(express.static('public'));

const apiKey = "acc1a4df476f3f959c237d98c7f6d4b348a622c57e4f100a9efbcd1a8149"
const defiURL = "https://ethgasstation.info/api/ethgasAPI.json?api-key=" + apiKey;
var fast = '';

const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(Object.values(data)[0]);
    fast = Object.values(data)[0];
  } catch (error) {
    console.log(error);
  }
  if(fast != null){
    return fast;
    console.log(fast);
  }
};

function intevalFunc(){
  getData(defiURL);
}

setInterval(intevalFunc, 1500);

app.get('/request', function(req, res, next) {
  var ethereum = request({
    uri: defiURL,
    qs: {
      api_key: apiKey
    }
  })
  console.log(ethereum);
  res.render('index', {ethereum});
  next()
});


app.get('/response', (req, res) => {
    res.render('index', {ethereum: fast});
})


app.listen(3000, () => {
  console.log("server running on port 3000");
})
