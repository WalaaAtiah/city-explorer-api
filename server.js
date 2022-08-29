require("dotenv").config();
const express = require("express"); //import express framework
const cors = require("cors");
const server = express();
const allData = require("./data/weather.json");

server.use(cors()); // make the server opened for any request
const PORT = process.env.PORT;
// http://localhost:3000/

server.get("/", (req, res) => {
  res.send("Hi from the home route");
  console.log("Hi from the home route");
});

// http://localhost:3000/test
server.get("/test", (req, res) => {
  res.send("Hi from the test route");
  console.log("Hi from the test route");
});

// http://localhost:3000/datatest
server.get("/datatest", (req, res) => {
  let data = allData.map((item) => {
    return item.data;
  });

  let des = {};
  let weather = data.map((item) => {
    let array = item.map((item2) => {
      des.weather = item2.weather;
      des.datetime = item2.datetime;

      return des;
    });
    return array;
  });

  res.send(weather);
});

//http://localhost:3000/weather?lat=lat&lon=lon&name=cityName
server.get("/weather", (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let cityName = req.query.name;
  console.log(lat, lon, cityName);

  let data = allData.find((item) => {
    console.log(
      (item.lat === lat) & (item.lon === lon) & (item.city_name === cityName)
    );

    if (
      (item.lat === lat) &
      (item.lon === lon) &
      (item.city_name === cityName)
    ) {
      return true;
    }
  });
  let finalResult = {};
   let Data2=data.data;   // git the data properity 
   let weatherData = Data2.map(item=>{
    finalResult.description=item.weather.description;
    finalResult.datetime=item.datetime
    console.log(finalResult);

     return ({...finalResult});
   })
  console.log(weatherData);

  res.send(weatherData);
});

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
