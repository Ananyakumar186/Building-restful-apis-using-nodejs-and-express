// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;

const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  let product = null
  product = productsList.find(pi=>pi.id == parseInt(productId));
  if(!product){
    return done("Requested product doesn't exist..!");
  }
  // get a product by ID
  return done(null, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
 // save a product
  let product = productsList.find(pi => pi.id === newProduct.id);
  if(product){
    return done("Product already exists..!");
  }
  else{
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList));
  }
}

const updateProduct = (productId, updateData, done) => {
  let product = productsList.find(pi=> pi.id === parseInt(productId));
  if(!product){
    return done("Requested product doesn't exist..!")
  }else{
    Object.assign(product,updateData);
    return done(null, JSON.stringify(productsList));
  }
}

const deleteProduct = (productId, done) => {
  // delete a product    
  let productIndex = productsList.findIndex(pi => pi.id === parseInt(productId));
  if (productIndex === -1){
    return done("Requested product doesn't exist..!")
  }else{
    productsList.splice(productIndex,1)
    return done(null, JSON.stringify(productsList));
  }
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}