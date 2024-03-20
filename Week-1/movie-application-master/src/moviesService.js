// Import the axios library
const axios = require('axios')

const getMovies = (done) => {
  // get all movies
  axios
    .get("http://localhost:3000/movies/")
    .then((response) => {
      return done(null, JSON.stringify(response.data));
    })
    .catch((err) => {
      return done(JSON.stringify(err.message));
    });
}

const getMoviesById = (movieId, done) => {
  // get movie by id
  axios.get(`http://localhost:3000/movies/${movieId}`)
    .then((response) =>{
      return done(null, JSON.stringify(response.data));
  })
  .catch((err) =>{
    return done(JSON.stringify(err.message));
  })
}

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
  axios.post(`http://localhost:3000/movies/`,newMovie)
  .then((response) => {
    return done(null, JSON.stringify(response.data));
  })
  .catch((err)=>{
    return done(JSON.stringify(err.message));
  })
}

const updateMovie = function (movieId, updateData, done) {
 // update movie details of a specific movie
  axios.put(`http://localhost:3000/movies/${movieId}`,updateData)
  .then((response)=>{
    return done(null, JSON.stringify(response.data));
  })
  .catch((error)=>{
    return done(JSON.stringify(error.message));
  })
}

const deleteMovieById = function (movieId, done) {
  // delete a specific movie 
  axios.delete(`http://localhost:3000/movies/${movieId}`)
  .then((response)=>{
    return done(null,JSON.stringify(response.data));
  })
  .catch((err)=>{
    return done(err.message);
  })
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
