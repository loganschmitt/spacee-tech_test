//packages needed
const express = require('express');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');

//important globals
const myCache = new NodeCache();
const NASA_API_KEY = "Kwy1dS4QRfDmr59crEGkfOUerh9cDHLKnj9UO0Uh"
const app = express();
const PORT = 3000;

//------------------------------------------------------------------------------------
app.get(`/mars-rover/images/:date`, (req, res) => {
  date = req.params.date;
  const valid_date = new Date(date);
  console.log(valid_date);

  if (!isNaN(valid_date)) {
    //user has queried a valid date

    var html = "";
    var uri = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`;

    value = myCache.get(date); //look in cache and see if we have our query results already
    if (value == undefined) {
      console.log(date + " value not found in cache...fetching from NASA API");
      fetch(uri).then((response) => response.json()).then((data) => {
        var photos = data.photos; //array of all our photos from API
        var length = photos.length;

        if(length == 0) {
          html = "<center> <h2>No photos found for this day.</h2> </center>";
          res.send(html)
        } else {
          html += "Returning " + length + " photos for date: " + date + " <br/><br/>";
          var image_urls = [];
          for (let i =0; i < length; ++i) {
            var photo = photos[i].img_src;
            image_urls.push(photo);
            html += "<img src=" + photo + " width=50%; height=50%/> <br/><br/>";
          }
          myCache.set(date, html, 5000);
          res.send(html);
        }
        
      }) 
    } else {
      console.log(date + " found in cache... restoring contents");
      res.send(value);
    }
  } else {
    html = "<center><h2>Invalid Date entered. Please send another query with a new date.</h2></center> <br/><br/>"
    res.send(html);
  }
});

//------------------------------------------------------------------------------------
app.listen(PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running and App is listening on port "+ PORT)
  else 
      console.log("Error occurred, server can't start", error);
  }
);

//Test - NASA's picture of the day
//------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------
