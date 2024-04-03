

//import the modules that are required
const express = require("express");
const router = express.Router();
const authController = require("./authController");
//This method post will regiater the use
router.post('/register',(req,res)=>{
  try{
        const {name,email,password} = req.body;
        if(!(name,email,password)){
                return res.status(400).send("Required inputs are missing");
        }

        const userDetails = {
                name,email,password
        };
          authController.registerUser(userDetails, (err, result) => {
                  if (err) {
                          return res.status(401).send({ error: "User alredy exists" });
                  } else {
                          return res.status(201).send(result);
                  }
          })
  }catch(error){
          return res
                  .status(401)
                  .send({ error: "Unexpected error while registering the user" });
  }
  });

//This method post will login the user once they are registered
router.post('/login',(req,res)=>{
   try{
           const { name, email, password } = req.body;
           if (!(name, email, password)) {
                   return res.status(400).send("Required inputs are missing");
           }
           //retrive email and password from req.body

           //calling the authController login usermethod return the error or the result 
           authController.loginUser({ email, password }, (err, result) => {
                   if (err) {
                           return res.status(401).send({ error: "Invalid credentials", err });
                   } else {
                           return res.status(200).send({ STATUS: "OK", data: result });
                   }
           })
   }catch(error){
           console.log(error);
           return res
                   .status(401)
                   .send({ error: "Unexpected error while registering the user", error });
   }
   });

module.exports = router