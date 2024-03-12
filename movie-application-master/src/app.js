// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT = process.env.PORT || 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  if(req.url === '/api/v1/movies' && req.method === 'GET'){
    moviesService.getMovies((err, result) =>{
      if(err){
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });

        res.end(err);
      }else{
        res.writeHead(200,{
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(result);
      }
    })
  }

  // Get a movie with specified id
  else if (req.url.match(/\/api\/v1\/movies\/[0-9+]/) && req.method === 'GET') {
    let id = req.url.split("/")[4];
    moviesService.getMoviesById(id,(err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });

        res.end(err);
      } else {
        res.writeHead(200, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(result);
      }
    })
  }
  // Save movie details
  else if (req.url === '/api/v1/movies' && req.method === 'POST') {
    let newMovie = await getRequestData(req);
    moviesService.saveMovie(JSON.parse(newMovie), (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });

        res.end(err);
      } else {
        res.writeHead(200, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(result);
      }
    })
  }
  // Update a specific movie
  else if (req.url.match(/\/api\/v1\/movies\/[0-9+]/) && req.method === 'PUT') {
    let newMovie = await getRequestData(req);
    let id  = req.url.split("/")[4];
    moviesService.updateMovie(id,JSON.parse(newMovie), (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });

        res.end(err);
      } else {
        res.writeHead(201, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(result);
      }
    })
  }
  // Delete a specific movie
  else if (req.url.match(/\/api\/v1\/movies\/[0-9+]/) && req.method === 'DELETE') {
    let id = req.url.split("/")[4];
    moviesService.deleteMovieById(id, (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });

        res.end(err);
      } else {
        res.writeHead(200, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(result);
      }
    })
  }
  // If no route present capture in the else part
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
