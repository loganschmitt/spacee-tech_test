const express = require('express');
var request = require('request');
var axios = require('axios');

const app = express();
const PORT = 3000;

app.get(`/mars-rover/images/:date`, function(req, res, next) {
  var date = req.params.date
  request({
    uri: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=DEMO_KEY`,
  }).pipe(res);
  console.log(res)
});

app.listen(PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running and App is listening on port "+ PORT)
  else 
      console.log("Error occurred, server can't start", error);
  }
);