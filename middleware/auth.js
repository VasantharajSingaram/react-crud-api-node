import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const auth = (request, response, next) => {
    try{
    const token = request.header("x-auth-token")
    console.log("token", token);
    jwt.verify(token, process.env.SECRET_KEY); // checkin the toke in valid or not // 
    next(); // this is to go the next function 
    } catch (err) {
        response.status(401).send({ message: err.message});
    }
    
};