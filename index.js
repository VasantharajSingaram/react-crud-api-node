//const express = require("express");

import express, { query } from "express"; // "type": "module" // replacement for the above code

import { MongoClient } from "mongodb";

import * as dotenv from 'dotenv'

import usersRouter from "./routes/users.route.js";

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

// local dtabase
// const users = [
//     {
    
//           "id": "01",
//           "profilePic": "https://cdn.fansshare.com/image/robertdowneyjr/tony-stark-hot-151199060.jpg",
//           "userId" : "00abc1",
//           "fname": "Tony",
//           "lname": "Stark",
//           "age": "48",
//         },
//         {
//         "id": "02",
//         "profilePic": "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQM90dxKi2Ng2PB6TZlqUZkCgwPFG87v70NkDySutfbkBSDN525VUdBZALNdyDdrqG2IgS3fZD-V5VzP1k",
//         "userId" : "00abc2",
//         "fname": "Peter",
//         "lname": "Parker",
//         "age": "24",
//       },
//       {
//         "id": "03",
//         "profilePic": "https://media.wired.com/photos/627b4658323db22d6ba1fed1/master/pass/Wanda-Dr-Strange-Multiverse-Madness-Culture.jpg",
//         "userId" : "00abc3",
//         "fname": "Wanda",
//         "lname": "Maixmoff",
//         "age": "28",
//       },
//       {
//         "id": "04",
//         "profilePic": "https://wallpaperaccess.com/full/1554800.jpg",
//         "userId" : "00abc4",
//         "fname": "Gamora",
//         "lname": "Zen",
//         "age": "29",
//       },
//       {
//         "id": "05",
//         "profilePic": "https://www.denofgeek.com/wp-content/uploads/2021/01/webstory-captain-america-cover03.jpg",
//         "userId" : "00abc5",
//         "fname": "Steve",
//         "lname": "Rogers",
//         "age": "105",
//       },
//       {
//         "id": "06",
//         "profilePic": "https://assets-prd.ignimgs.com/2022/07/01/thorloveandthunder-blorgoll-01-1656709247130.jpg",
//         "userId" : "00abc6",
//         "fname": "Thor",
//         "lname": "Odinson",
//         "age": "1500",
//       },
//       {
//           "id": "07",
//           "profilePic": "https://media.newyorker.com/photos/5a875e3f33aebd0cab9bab12/2:2/w_1079,h_1079,c_limit/Brody-Passionate-Politics-Black-Panther.jpg",
//           "userId" : "00abc7",
//           "fname": "Black",
//           "lname": "Panther",
//           "age": "43",
//       },
//       {
//           "id": "08",
//           "profilePic": "https://media.vogue.fr/photos/5c7ed01e08858f0dc0e2d287/2:3/w_2560%2Cc_limit/capmarvel.jpg",
//           "userId" : "00abc8",
//           "fname": "Captain",
//           "lname": "Marvel",
//           "age": "30",
//       }   
//       ];



app.use(express.json());


// get home page
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});



app.use("/users", usersRouter)


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


export { client };