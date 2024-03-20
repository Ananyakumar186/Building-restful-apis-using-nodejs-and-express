//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = process.env.PORT || 5000

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  // Get all products
  console.log("req",req);
  if (req.url === '/api/v1/product' && req.method === 'GET') {
    const products = await productsService.getProducts();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(products);
    }
  // Get a product with specified id
  if (req.url.match(/\/api\/v1\/product\/[0-9+]/) && req.method === 'GET') {
    let id = req.url.split('/')[4];
    console.log("checking id",id);
    productsService.getProductsById(id, (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(err);
      }
      else {
        res.writeHead(200, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(JSON.stringify(result));
      }
    });
    
   
  }
  // Create a new product
  if (req.url === '/api/v1/product' && req.method === 'POST') {
    let newProduct = await getRequestData(req);
    productsService.saveProduct(JSON.parse(newProduct), (err, result) => {
      if(err){
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(err);
      }else{
        res.writeHead(201, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(result);
      }

    });
  }
  // Update a specific product
  if (req.url.match(/\/api\/v1\/product\/[0-9+]/) && req.method === 'PUT') {
    let id = req.url.split('/')[4];
    let newProduct = await getRequestData(req);
    productsService.updateProduct(id, JSON.parse(newProduct), (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(err);
      }else{
        res.writeHead(200, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(null,result);
      }
      
    });
    
  }

  // Delete a specific Product
  if (req.url.match(/\/api\/v1\/product\/([0-9+])/) && req.method === 'DELETE'){
    const id = req.url.split('/')[4];
    productsService.deleteProduct(id,(err,result)=>{
      if(err){
        res.writeHead(404, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(err);
      }else{
        res.writeHead(200, {
          'content-Type': 'application/json',
          'content-disposition': 'JSON'
        });
        res.end(null,result);
      }
    });
    
  }
  
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})