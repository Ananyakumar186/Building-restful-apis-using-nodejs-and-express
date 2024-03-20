

//import the DAO layer
const productDAO = require('./productDao')

const getProducts = function(done){
  //call dao getproducts method and pass the parameter
  productDAO.getProducts(done);
}

const getProductById = function(id, done){
  //call dao getProductById method and pass the parameter
 productDAO.getProductById(id,done);
}
const saveProductDetails = function(productDetails, done){
  //call dao saveProductDetails method and pass the parameter
  productDAO.saveProductDetails(productDetails,done);
}


const deleteProductById = (productId, done) => {
//call dao deleteProductById method and pass the parameter
productDAO.deleteProductById(productId,done);
}



module.exports = {
  getProducts, getProductById,saveProductDetails, deleteProductById
}
