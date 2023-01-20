
import express from "express";
import { createUser, generateHashedPassword, getUserByName } from "../services/signup.service.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const router = express.Router();


// Signup PRocess

    router.post("/signup", async function (request, response) {
      const { username, password } = request.body;

      const userFromDB = await getUserByName(username);

      // const hashedPassword = await generateHashedPassword(password)
      // // db.userssignup.insertOne(data);
      // const result = await createUser({ 
      //   username: username,
      //   password : hashedPassword
      // });
      // response.send(result);
      console.log(userFromDB);

      if(userFromDB){
        response.status(400).send({message: 'User already exists'})
      } else if(password.length < 8){
        response.status(400).send({message: 'Password must be at least 8 characters'});
      }
      else {
           const hashedPassword = await generateHashedPassword(password)
      
      const result = await createUser({ 
        username: username,
        password : hashedPassword
      });
      response.send(result);
      }
    });
    
    

  // Login Process

    router.post("/login", async function (request, response) {
      const { username, password } = request.body;

      const userFromDB = await getUserByName(username);
      console.log(userFromDB);

      if(!userFromDB){ // if user is not found
        response.status(401).send({message: 'Invalid Credentials'}); // 401 unauthorized
      } else { // Checking weather username and password matches.
        const storedDBPassword = userFromDB.password;
        const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
        console.log(isPasswordCheck);

        if (isPasswordCheck) {
          const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY ) // We need to send with the secret key(token) from node side only _id is the unique value see in mongoDBAtlas
          response.send({message: "Success!", token: token}) // For successful login // Give the Token when successful

        } else {
          response.status(401).send({message: "Invalid password"});  // For invalid password
        }
      }
    });
    
    export default router;


