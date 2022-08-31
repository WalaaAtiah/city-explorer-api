
require("dotenv").config();
const express = require("express"); //import express framework
const cors = require("cors");
const server = express();
server.use(cors()); // make the server opened for any request
const axios = require("axios");

const PORT = process.env.PORT || 3000; // http://localhost:3000/

const weatherkey = process.env.weatherkey;

function getweathersHandler(req, res) {
    let { lat, lon, name } = req.query;
    console.log(lat);
    console.log(lon);
    console.log(name);
    const URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherkey}&lat=${lat}&lon=${lon}&cityName=${name}`;
  
    console.log("hi from getweathe");
  
    axios
      .get(URL)
      .then((result) => {
        //do the things that dependent on the axios result
        console.log("axios completed");
        let resultData = result.data.data.map((item) => {
          return new weather(item);
        });
        console.log(resultData);
        res.status(200).send(resultData);
      })
  
      .catch((error) => {
        res.status(404).send(error);
      });
  }
  
  class weather {
    constructor(item) {
      this.datatime = item.datetime;
      this.description = item.weather.description;
    }
  }

  module.exports = getweathersHandler;