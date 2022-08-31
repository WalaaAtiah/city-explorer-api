"use strict";

require("dotenv").config();
const express = require("express"); //import express framework
const cors = require("cors");
const server = express();
const allData = require("./data/weather.json");
server.use(cors()); // make the server opened for any request
const axios = require("axios");

const PORT = process.env.PORT || 3000; // http://localhost:3000/


//require another file
let getweathersHandler = require('./component/weather');
let getmoviesHandler = require('./component/movie');






server.get("/", (req, res) => {
  res.send("Hi from the home route");
  console.log("Hi from the home route");
});

// http://localhost:3000/test
server.get("/test", (req, res) => {
  res.send("Hi from the test route");
  console.log("Hi from the test route");
});


//get weather

// http://api.weatherbit.io/v2.0/forecast/daily?key=[]]&lat=[]&lon=[]&cityName=[]

//http://localhost:3000/getWeather?lat=lat&lon=lon&name=cityName

server.get("/getWeather", getweathersHandler);





//movie

// https://api.themoviedb.org/3/search/movie?api_key=[]&query=cityName

//http://localhost:3000/movies?query=cityName

server.get("/movies", getmoviesHandler);


server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
