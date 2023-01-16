
import express from "express";

const router = express.Router();

import { getUsers, getUsersById, createUsers, deleteUsersById, updateUserById } from "../services/users.service.js";


router.get("/", async function (request, response) {  // Method: 2

    if(request.query.age){
      request.query.age = +request.query.age   // => changing the value to the number because it is in string
    }
    
    console.log(request.query);
      // Cursor = Pagination |  Cursor -> Array | toArray()
      const users = await getUsers(request);
      // console.log(users);
        response.send(users);
      });
    
    
    
    
    //  get by id only
    
    router.get("/:id", async function (request, response) {
      const { id } = request.params;
      const user = await getUsersById(id);
    
      user ? response.send(user):response.status(404).send({message: "user not found"});
    });
    
    
    // Insert many new users
    // XML JSON Text
    // middleware -express.json() - JSON -> JS Object
    // so app.use -> Intercepts -> applies express.json() (Inbuilt Middleware)
    router.post("/", async function (request, response) {
      const data = request.body;
      // console.log(data);
      const result = await createUsers(data);
      response.send(result);
    });
    
    
    // Delete a user by Id
    router.delete("/:id", async function (request, response) {
      const { id } = request.params;
      const result = await deleteUsersById(id);
      // console.log(result);
      result.deletedCount > 0
      ? response.send({ message: "user deleted successfully"})
      :response.status(404).send({message: "user not found"});
    });
    
    // update user by id
    
    router.put("/:id", async function (request, response) {
      const { id } = request.params;
    
      //db.users.updateOne({id: 03}), {$set: {rating: 9}}
    
      // const movie = movies.find((mv) => mv.id === id);
    
      const data = request.body;
    
      const result = await updateUserById(id, data);
    
      // console.log(result);
    
      response.send(result);
    });

    export default router;


