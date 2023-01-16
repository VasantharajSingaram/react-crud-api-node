import { client } from "../index.js";

export async function updateUserById(id, data) {
  return await client.db('crudApi').collection('users').updateOne({ id: id }, { $set: data });
}
export async function deleteUsersById(id) {
  return await client.db('crudApi').collection('users').deleteOne({ id: id });
}
export async function createUsers(data) {
  return await client.db("crudApi").collection("users").insertMany(data);
}
export async function getUsersById(id) {
  return await client.db('crudApi').collection('users').findOne({ id: id });
}
export async function getUsers(request) {
  return await client.db('crudApi').collection('users').find(request.query).toArray();
}
