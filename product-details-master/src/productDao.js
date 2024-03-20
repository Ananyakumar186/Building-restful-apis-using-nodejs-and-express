
//import fs module
const fs = require('fs')




//The getProducts function take done as callback
//It will read the product.json file

const getProducts = function(done){
  fs.readFile("./src/products.json",(err,fileContent)=>{
if(err){
  return done('Error getting the products');
}
  let productdata = JSON.parse(fileContent)
  return done(undefined, productdata)
})

//parse the filecontent and save it in another varible say productdata
//return the callback with first parameter as undefined and second parameter as productdata
       
}


//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function(id,done){
    //write all the logical steps
    //return the callback with first parameter as undefined and second parameter as productDetails
  fs.readFile("./src/products.json", (err, fileContent) => {
    if (err) {
      return done('Error getting the products');
    }
    let productdata = JSON.parse(fileContent);
    const product = productdata.find((pr)=>pr.id === parseInt(id))
    if(product === undefined){
      return done('No product detail found in the list',id);
    }
    return done(undefined, product)
  })
}


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  //write all the logical steps
  //parse the filecontent and save it in another varible say productdata
  //push the productDetails in the productData   
  //Write the productData into the file   
  //return the callback with undefined and ProductDetails
  fs.readFile("./src/products.json", (err, fileContent) => {
    if (err) {
      return done('Error getting the products');
    }
    let productdata = JSON.parse(fileContent);
    productdata.push(ProductDetails);

    fs.writeFile("./src/products.json", JSON.stringify(productdata), (err,updateContent)=>{
      if(err){
        return done('Failed to add Product')
      }
      return done(undefined,ProductDetails);
    })
    return done(undefined, product)
  });
    
  }

  //The method deleteProductById will take productId and done as parameters
  //It will read the product.json file

  const deleteProductById = function(productId, done){
    //Write all the logical steps
     //return the callback with first parameter as undefined and second parameter as productDetails
    fs.readFile("./src/products.json", (err, fileContent) => {
      if (err) {
        return done('Error getting the products');
      }
      let productdata = JSON.parse(fileContent);
      const productIndex = productdata.findIndex((pr)=> pr.id === parseInt(productId));
      if(productIndex === -1){
        return done('Error finding the product',productId);
      }
      productdata.splice(productIndex,1);
      fs.writeFile("./src/products.json", JSON.stringify(productdata), (err, updateContent) => {
        if (err) {
          return done('Failed to delete Product')
        }
        return done(undefined, 'Product is successfully deleted');
      })
    });
  }


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById
    
}