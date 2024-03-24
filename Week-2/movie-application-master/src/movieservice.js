
//import axios module
const axios = require("axios");
//After starting the JSOn server check the port on which is running accordingly change 
//the port in url given below

//This method will get all movies from json server
const getMovies = (done) => {
  // This url can be used - axios.get("http://localhost:3000/movies")
  axios.get("http://localhost:3000/movies/")
  .then((response)=>{
    return done(null,JSON.stringify(response.data));
  })
  .catch((error)=>{
    return done(JSON.stringify(error.message));
  })
}

//This method will get specific movie id from json server
const getMovieById = (movieId, done) => {
  // This url can be used- axios.get(`http://localhost:3000/movies/${movieId}`)
  axios.get(`http://localhost:3000/movies/${movieId}`)
  .then((response)=>{
    return done(null,JSON.stringify(response.data));
  })
  .catch((error)=>{
    return done(JSON.stringify(error.message));
  })
}
//This method will save Movie details in Json server
const saveMovieDetails = (movieDetails, done) => {
  //This url can be used  -  axios.post(`http://localhost:3000/movies`, movieDetails)
  axios.post(`http://localhost:3000/movies`, movieDetails)
  .then((response)=>{
    return done(null, JSON.stringify(response.data));
  }).catch((error) => {
    return done(JSON.stringify(error.message));
  })
}

//This method will update MovieDetails in Json Server
const updateMovieDetails = (movieId, movieDetails, done) => {
  //This url can be used - axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
  axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
  .then((response)=>{
    return done(null, JSON.stringify(response.data));
  }).catch((error) => {
    return done(JSON.stringify(error.message));
  })
}

//This method will delete specific movie from Json Server
const deleteMovieById = (movieId, done) => {
  //This url can be used -  axios.delete(`http://localhost:3000/movies/${movieId}`)
  axios.delete(`http://localhost:3000/movies/${movieId}`)
  .then((response)=>{
    return done(null, JSON.stringify(response.data));
  }).catch((error) => {
    return done(JSON.stringify(error.message));
  })
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, deleteMovieById, updateMovieDetails
}
