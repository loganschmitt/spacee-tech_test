const express = require('express');
// var request = require('request');
// var axios = require('axios');
const fetch = require('node-fetch');

const NASA_API_KEY = "Kwy1dS4QRfDmr59crEGkfOUerh9cDHLKnj9UO0Uh"
const app = express();
const PORT = 3000;

// app.get(`/mars-rover/images/:date`, function(req, res, next) {
//   date = req.params.date
//   request({
//     uri: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=DEMO_KEY`,
//   }).pipe(res);
//   console.log()
// });

app.get(`/mars-rover/images/:date`, (req, res) => {
  date = req.params.date;
  //for date error handling i think best course would be to convert to datetime and make sure there arent any years entered after current
  var html = "";
  var uri = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`;
  fetch(uri).then((response) => response.json()).then((data) => {
    var photos = data.photos; //array of all our photos
    var image_urls = [];
    for (let i =0; i < photos.length; ++i) {
      var foto = photos[i].img_src;
      image_urls.push(foto);
    }
    // console.log(foto);
    // if(foto) {
    //   html += "Image: <img src='" + foto + "' style='width:100%;'/> <br/><br/>";
    // } else {
    //   html += "sorry no image <br/><br/>";
    // }
    res.send(image_urls);
  }) 
});


app.listen(PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running and App is listening on port "+ PORT)
  else 
      console.log("Error occurred, server can't start", error);
  }
);

//Test
app.get('/potd', (req, res) => {
  let api_url = 'https://api.nasa.gov/planetary/apod?api_key=' + NASA_API_KEY;
  fetch(api_url).then((response) => response.json()).then((data) => {
    let html = "Date: " + data.date + "<br/><br/>";
    html += "Title: " + data.title + "<br/><br/>";
    html += "Image: <img src='" + data.hdurl + "' style='width:100%;'/> <br/><br/>";
    res.send(html)
  })
  .catch((err) => console.log(err));
});
//Everything above this line works
//------------------------------------------------------------------------------------
