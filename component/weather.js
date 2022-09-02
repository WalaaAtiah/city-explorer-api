
require("dotenv").config();
const express = require("express"); //import express framework
const cors = require("cors");
const server = express();
server.use(cors()); // make the server opened for any request
const axios = require("axios");

const PORT = process.env.PORT || 3000; // http://localhost:3000/
 

const weatherkey = process.env.weatherkey;

let myMemory={}

function getweathersHandler(req, res) {
    let { lat, lon, name } = req.query;
    // console.log(lat);
    // console.log(lon);
    // console.log(name);
    const URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherkey}&lat=${lat}&lon=${lon}&cityName=${name}`;
  
    console.log("hi from getweathe");
    console.log(lat,lon,name)
  
if (myMemory[name]){
  console.log('inside mymemory')
  res.status(200).send(myMemory[name]);

}else{
  axios
  .get(URL)
  .then((result) => {
    //do the things that dependent on the axios result
    console.log("weather axios completed");
    // console.log("result.data.data",result.data.data);

    let resultData = result.data.data.map((item) => {
      return new weather(item);
    });
    console.log("weather result",resultData);
    myMemory[name]=resultData;
    res.status(200).send(resultData);
  })

  .catch((error) => {
    res.status(404).send(error);
  });
}

    
  }
  
  class weather {
    constructor(item) {
      this.datatime = item.datetime;
      this.description = item.weather.description;
      this.high_temp=item.high_temp; 
      this.low_temp=item.low_temp;
    }
  }

  module.exports = getweathersHandler;