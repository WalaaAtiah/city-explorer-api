"use strict";

require("dotenv").config();
const express = require("express"); //import express framework
const cors = require("cors");
const server = express();
const allData = require("./data/weather.json");
server.use(cors()); // make the server opened for any request
const axios = require("axios");

const PORT = process.env.PORT || 3000; // http://localhost:3000/

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

//class07
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
  let Data2 = data.data; // git the data properity
  let weatherData = Data2.map((item) => {
    finalResult.description = item.weather.description;
    finalResult.datetime = item.datetime;
    console.log(finalResult);

    return { ...finalResult };
  });
  console.log(weatherData);

  res.send(weatherData);
});
//class08

const weatherkey = process.env.weatherkey;

// http://api.weatherbit.io/v2.0/forecast/daily?key=[]]&lat=[]&lon=[]&cityName=[]

//http://localhost:3000/getWeather?lat=lat&lon=lon&name=cityName

server.get("/getWeather", getweathersHandler);

async function getweathersHandler(req, res) {
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
//movie
const moviekey = process.env.moviekey;

// https://api.themoviedb.org/3/search/movie?api_key=[]&query=cityName

//http://localhost:3000/movies?query=cityName

server.get("/movies", getmoviesHandler);

async function getmoviesHandler(req, res) {
  console.log("hi from movie");

  let { query } = req.query;
  console.log(query);
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${moviekey}&query=${query}`;

//   axios
//   .get(URL)
//   .then((result) => {
//     //do the things that dependent on the axios result
//     console.log("axios completed");
//     console.log(result)
//   });

 

//   res.send("hi from movie");
// }

  axios
    .get(URL)
    .then((result) => {
      //do the things that dependent on the axios result
      console.log(result.data);
      let resultData=result.data.results.map(item=>{
        return new movie (item);
      })
      // console.log(resultData)

      res.status(200).send(resultData);
    })

    .catch((error) => {
      res.status(404).send(error);
    });

}

class movie {
  constructor(item) {
      this.title = item.title;
      this.overview = item.overview;
      this.vote_average = item.vote_average;
      this.total_votes = item.vote_count;
      this.image_url ="https://image.tmdb.org/t/p/w500" +item.poster_path;
      this.popularity = item.popularity;
      this.released_on = item.release_date;

  }
}

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
