//const express = require("express");

import express, { query } from "express"; // "type": "module" // replacement for the above code

import { MongoClient } from "mongodb";

import * as dotenv from 'dotenv'

dotenv.config()

const app = express();

const PORT = 4000;


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

// get information by all there are 2 meothods
// Method: 1

// app.get("/users",  function (request, response) {
//   const users = client.db('crudApi').collection('users').find({}).toArray();;
//   users.toArray(function (err, result) {
//     if (err) {
//       response.status(500).send(err);
//     } else {
//       response.send(result);
//     }
//   });
// });

// Method: 2

app.get("/users", async function (request, response) {

if(request.query.age){
  request.query.age = +request.query.age   // => changing the value to the number because it is in string
}

console.log(request.query);
  // Cursor = Pagination |  Cursor -> Array | toArray()
  const users = await client.db('crudApi').collection('users').find(request.query).toArray();
  // console.log(users);
    response.send(users);
  });




//  get by id only

app.get("/users/:id", async function (request, response) {
  const { id } = request.params;
  const user = await client.db('crudApi').collection('users').findOne({ id: id})

  user ? response.send(user):response.status(404).send({message: "user not found"});
});


// Insert many new users
// XML JSON Text
// middleware -express.json() - JSON -> JS Object
// so app.use -> Intercepts -> applies express.json() (Inbuilt Middleware)
app.post("/users", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client.db("crudApi").collection("users").insertMany(data)
  response.send(result);
});


// Delete a user by Id
app.delete("/users/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client.db('crudApi').collection('users').deleteOne({ id: id})
  console.log(result);
  result.deletedCount > 0
  ? response.send({ message: "user deleted successfully"})
  :response.status(404).send({message: "user not found"});
});

// update user by id

app.put("/users/:id", async function (request, response) {
  const { id } = request.params;

  //db.users.updateOne({id: 03}), {$set: {rating: 9}}

  // const movie = movies.find((mv) => mv.id === id);

  const data = request.body;

  const result = await client.db('crudApi').collection('users').updateOne({ id: id}, { $set: data})

  console.log(result);

  response.send(result);
});




app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
