
require("dotenv").config();
const express = require("express"); //import express framework
const cors = require("cors");
const server = express();
server.use(cors()); // make the server opened for any request
const axios = require("axios");

const PORT = process.env.PORT || 3000; // http://localhost:3000/



const moviekey = process.env.moviekey;



function getmoviesHandler(req, res) {
    console.log("hi from movie");
  
    let { query } = req.query;
    console.log(query);
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${moviekey}&query=${query}`;
  
  
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




module.exports = getmoviesHandler;
