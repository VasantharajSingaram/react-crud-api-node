//const express = require("express");

import express, { query } from "express"; // "type": "module" // replacement for the above code

import { MongoClient } from "mongodb";

import * as dotenv from 'dotenv'

import usersRouter from "./routes/users.route.js";

import signupRouter from "./routes/signup.route.js";

import bcrypt from 'bcrypt';

import cors from 'cors';
import { auth } from "./middleware/auth.js";

dotenv.config()

const app = express();

const PORT = process.env.PORT;


// Conecting MongoDb

// const MONGO_URL = 'mongodb://localhost:27017';

// env -  environment variables


const MONGO_URL = process.env.MONGO_URL;

// Live Connection is needed... Like dialing the number in phone
const client = new MongoClient(MONGO_URL); // Node to MongoDb bridge is client

// Connection take time so we are giving await function to make sure connection (promise) Its like calling

// This is top level await... // if your using await in inner th function means we need to put async await or if it  is outside means we can use await.. thats enough...
await client.connect(); 

console.log("Mongo is connected !!!"); // For our use

// middleware - express.json() (inbuilt middleware) - JSON - JS Object
// app.use -> Intercepts -> applies express.json() (inbuilt middleware)

app.use(express.json()); // for showing data
app.use(cors()) // for showing data


// get home page
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});



app.use("/users", usersRouter);
app.use("/signup", signupRouter);

// const mobiles = [
//   {
//     "model": "OnePlus 9 5G",
//     "img": "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
//     "company": "Oneplus"
//     },
//     {
//     "model": "Iphone 13 mini",
//     "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
//     "company": "Apple"
//     },
//     {
//     "model": "Samsung s21 ultra",
//     "img": "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
//     "company": "Samsung"
//     },
//     {
//     "model": "Xiomi mi 11",
//     "img": "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
//     "company": "Xiomi"
//     }
    
// ];

// this is from local storage
// app.get('/mobiles', (request, response) => {
//   response.send(mobiles); 
// })




// this is sending data to the mongo atlas

// app.post('/mobiles', async (request, response) => {
//   const data = request.body; // sending the data from the post man on the body
//   //db.mobiles.insertMany(data) // sending the data from the node to mongodb its mongo command below is node command
//   const result = await client.db('mobiles-ecom').collection('mobiles').insertMany(data);
//   response.send(result);
// })



// this is from mongodb atlas

// app.get('/mobiles', auth, async (request, response) => {
//   const data = request.body; // sending the data from the post man on the body
//   //db.mobiles.insertMany(data) // sending the data from the node to mongodb its mongo command below is node command
//   const result = await client.db('mobiles-ecom').collection('mobiles').find({}).toArray();
//   // find alwawys give cursor so adding .toArray at the end find
//   response.send(result);
// })

app.post('/pizzo', async (request, response) => {
  const data = request.body; 
  const result = await client.db('pizzo').collection('pizzas').insertMany(data);
  response.send(result);
})

app.get('/pizzo', async (request, response) => {
  const data = request.body; 
  const result = await client.db('pizzo').collection('pizzas').find({}).toArray();
  response.send(result);
})


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));






export { client }; 