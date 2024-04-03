

//import jsonwebtoken and config
const jwt = require("jsonwebtoken");
const config = require("../../config");
//This function verifyToken will verify the token coming from headers 
const verifyToken = (req, res, next) => {
  // Getting the authorization header
  const token = req.headers["authorization"];
  if(!token){
    return res.status(403).send("A token is required for authentication")
  }
 
//Synchronously verify given token using a secret or a public key to get a decoded token 
 try{
  const decoded = jwt.verify(token,config.AUTH_SECRET);
  req.claims = decoded;
 }catch(error){
   return res.status(401).send("Invalid Token");
 }
  //return next
  return next();
};

module.exports = verifyToken;